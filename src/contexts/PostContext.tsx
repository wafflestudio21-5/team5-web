import axios from 'axios'
import { createContext, ReactNode, useContext, useState } from 'react'

type tryPostProps = {
	navigate: (to: string) => void,
	addr: string
}

export type PostContextData = {
	content: string,
    setContent: (s:string)=>void,
	tryPost: (props: tryPostProps) => void
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
					
				}
			)
			console.log(response)
			navigate(addr)
		} catch (error) {
			alert('포스트 생성 실패')
		}
	}
	return (
		<PostContext.Provider
			value={{
				content, 
				setContent,
				tryPost
			}}
		>
			{children}
		</PostContext.Provider>
	)
}

export function useUserContext() {
	const context = useContext(PostContext)
	if (!context) {
		throw new Error('useUserContext must be used within a UserProvider')
	}
	return context
}
