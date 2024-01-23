import axios from 'axios';
import { createContext, ReactNode, useContext, useState } from 'react';

export type UserContextData = {
	accessToken: string;
	setAccessToken: (s: string) => void;
	name: string;
	setName: (s: string) => void;
	username: string;
	setUsername: (s: string) => void;
	resetAccessToken: () => void;
};

export const UserContext = createContext<UserContextData | null>(null);

type ProviderProps = {
	children: ReactNode;
};
export function UserProvider({ children }: ProviderProps) {
	const [accessToken, setAccessToken] = useState('');
	const [name, setName] = useState('');
	const [username, setUsername] = useState('');

	const resetAccessToken = async () => {
		try {
			const response = await axios.get(
				'https://waffle5gram.shop/api/v1/auth/refresh_token'
			);
			setAccessToken(response.data.accessToken);
			console.log(response.data.accessToken);

		} catch (e) {
			alert('액세스 토큰 재발급 실패');
		}
	};
	return (
		<UserContext.Provider
			value={{
				accessToken,
				setAccessToken,
				name,
				setName,
				username,
				setUsername,
				resetAccessToken,
			}}
		>
			{children}
		</UserContext.Provider>
	);
}

export function useUserContext() {
	const context = useContext(UserContext);
	if (!context) {
		throw new Error('useUserContext must be used within a UserProvider');
	}
	return context;
}
