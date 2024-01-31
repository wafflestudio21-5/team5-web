import { createContext, ReactNode, useContext, useState } from 'react';

export type AuthContextData = {
	name: string;
	setName: (s: string) => void;
	username: string;
	setUsername: (s: string) => void;
	password: string;
	setPassword: (s: string) => void;
	email: string;
	setEmail: (s: string) => void;
	birthday: Date;
	setBirthday: (d: Date) => void;
	isSaved: boolean;
	setIsSaved: (b: boolean) => void;
};

export const AuthContext = createContext<AuthContextData | null>(null);

type ProviderProps = {
	children: ReactNode;
};
export function AuthProvider({ children }: ProviderProps) {
	const [name, setName] = useState('');
	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');
	const [email, setEmail] = useState('');
	const [birthday, setBirthday] = useState(new Date());
	const [isSaved, setIsSaved] = useState(false);

	return (
		<AuthContext.Provider
			value={{
				name,
				setName,
				username,
				setUsername,
				password,
				setPassword,
				email,
				setEmail,
				birthday,
				setBirthday,
				isSaved,
				setIsSaved,
			}}
		>
			{children}
		</AuthContext.Provider>
	);
}

export function useAuthContext() {
	const context = useContext(AuthContext);
	if (!context) {
		throw new Error('useAuthContext must be used within a AuthProvider');
	}
	return context;
}
