import axios from 'axios'
import { createContext, ReactNode, useContext, useState } from 'react'

export type UserContextData = {
	username: string,
    name: string,
    password: string,
    accessToken: string,
    refreshToken: string,
    setUsername: (s:string) => void,
    setName: (s:string) => void,
    setPassword: (s:string) => void,
    setAccessToken: (s:string) => void,
    setRefreshToken: (s:string) => void
}

export const UserContext = createContext<UserContextData | null>(null)

type ProviderProps = {
	children: ReactNode
}
export function UserProvider({ children }: ProviderProps) {
	const [username, setUsername] = useState('')
    const [name, setName] = useState('')
    const [password, setPassword] = useState('')
    const [accessToken, setAccessToken] = useState('')
    const [refreshToken, setRefreshToken] = useState('')
	return (
		<UserContext.Provider
			value={{
				username,
                name,
                password,
                accessToken,
                refreshToken,
                setUsername,
                setName,
                setPassword,
                setAccessToken,
                setRefreshToken
			}}
		>
			{children}
		</UserContext.Provider>
	)
}

export function useUserContext() {
	const context = useContext(UserContext)
	if (!context) {
		throw new Error('useUserContext must be used within a UserProvider')
	}
	return context
}
