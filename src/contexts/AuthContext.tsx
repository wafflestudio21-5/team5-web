import axios from 'axios';
import { createContext, ReactNode, useContext, useState } from 'react';

type trySignUpProps = {
	navigate: (to: string) => void;
	addr: string;
};

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
	isLoggedin: boolean;
	setIsLoggedin: (b: boolean) => void;
	trySignUp: (props: trySignUpProps) => void;
	tryLogin: () => Promise<string>;
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
	const [isLoggedin, setIsLoggedin] = useState(false);
	const trySignUp = async ({ navigate, addr }: trySignUpProps) => {
		try {
			const year = birthday.getFullYear();
			const month = String(birthday.getMonth() + 1).padStart(2, '0');
			const day = String(birthday.getDate()).padStart(2, '0');
			const formatted = `${year}-${month}-${day}`;
			const response = await axios.post(
				'https://waffle5gram.shop/api/v1/auth/signup',
				{
					username: username,
					name: name,
					password: password,
					contact: email,
					contactType: 'email',
					birthday: formatted,
				}
			);
			console.log(response);
			navigate(addr);
		} catch (error) {
			alert('회원가입 실패');
		}
	};
	const tryLogin = async () => {
		const [accessToken, setAccessToken] = useState('');
		try {
			const data = {
				username: username,
				password: password,
				/* type: checkType() */
			};
			const response = await axios.post(
				'https://waffle5gram.shop/api/v1/auth/login',
				data,
				{
					headers: {
						'Content-Type': 'application/json',
					},
				}
			);
			setAccessToken(response.data.accessToken);
		} catch {
			alert('아이디나 비밀번호가 다릅니다.');
		}
		return accessToken;
	};
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
				isLoggedin,
				setIsLoggedin,
				trySignUp,
				tryLogin,
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
