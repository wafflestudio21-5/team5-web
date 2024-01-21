import axios from 'axios'
import { createContext, ReactNode, useContext, useState } from 'react'

type tryPostProps = {
	navigate: (to: string) => void,
	addr: string
}

export type PostContextData = {
	content: string,
    setContent: string,
}

export const PostContext = createContext<PostContextData | null>(null)

type ProviderProps = {
	children: ReactNode
}
export function PostProvider({ children }: ProviderProps) {
	const [content, setContent] = useState('')
	const tryPost = async ({navigate, addr}: tryPostProps) => {
		try {
			const response = await axios.post(
				'/api/v1/post',
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
		<UserContext.Provider
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
