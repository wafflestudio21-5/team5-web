import { createContext, ReactNode, useContext, useState } from 'react'

export type UserContextData = {
	username: string,
	setUsername: (s: string) => void,
	password: string,
	setPassword: (s: string) => void,
	isLoggedin: boolean,
	setIsLoggedin: (b: boolean) => void
}

export const UserContext = createContext<UserContextData | null>(null)

type ProviderProps = {
	children: ReactNode
}
export function UserProvider({ children }: ProviderProps) {
	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');
	const [isLoggedin, setIsLoggedin] = useState(false);
	return <UserContext.Provider value={{
		username,
		setUsername,
		password,
		setPassword,
		isLoggedin,
		setIsLoggedin
	}}>
		{children}
	</UserContext.Provider>
}

export function useUserContext() {
	const context = useContext(UserContext)
	if (!context) {
		throw new Error('useUserContext must be used within a UserProvider')
	}
	return context
}
