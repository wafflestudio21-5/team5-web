import axios from 'axios'
import { createContext, ReactNode, useContext, useState } from 'react'

type trySignUpProps = {
	navigate: (to: string) => void,
	addr: string
}

export type AuthContextData = {
	name: string
	setName: (s: string) => void
	username: string
	setUsername: (s: string) => void
	password: string
	setPassword: (s: string) => void
	email: string
	setEmail: (s: string) => void
	birthday: Date
	setBirthday: (d: Date) => void
	isLoggedin: boolean
	setIsLoggedin: (b: boolean) => void
	trySignUp: (props: trySignUpProps) => void
}

export const AuthContext = createContext<AuthContextData | null>(null)

type ProviderProps = {
	children: ReactNode
}
export function AuthProvider({ children }: ProviderProps) {
	const [name, setName] = useState('')
	const [username, setUsername] = useState('')
	const [password, setPassword] = useState('')
	const [email, setEmail] = useState('')
	const [birthday, setBirthday] = useState(new Date())
	const [isLoggedin, setIsLoggedin] = useState(false)
	const trySignUp = async ({navigate, addr}: trySignUpProps) => {
		try {
			const response = await axios.post(
				'/api/v1/auth/signup',
				{
					username: username,
					name: name,
					password: password,
					contact: email,
					contact_type: email
				}
			)
			console.log(response)
			navigate(addr)
		} catch (error) {
			alert('회원가입 실패')
		}
	}
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
				isLoggedin,
				setIsLoggedin,
				trySignUp,
			}}
		>
			{children}
		</AuthContext.Provider>
	)
}

export function useUserContext() {
	const context = useContext(AuthContext)
	if (!context) {
		throw new Error('useUserContext must be used within a UserProvider')
	}
	return context
}
