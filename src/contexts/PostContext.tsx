import axios from 'axios'
import { createContext, ReactNode, useContext, useState } from 'react'

type tryPostProps = {
	navigate: (to: string) => void,
	addr: string
}

export type PostContextData = {
	content: string,
	hideComments: boolean,
	hideLikes: boolean,
	files: FileList | null,
	subject: string,
	setHideComments: (b:boolean) => void,
	setHideLikes: (b:boolean) => void,
	setFiles: (f: FileList | null) => void
    setContent: (s:string) => void,
	setSubject: (s:string) => void,
	tryPost: (props: tryPostProps) => void
}

export const PostContext = createContext<PostContextData | null>(null)

type ProviderProps = {
	children: ReactNode
}
export function PostProvider({ children }: ProviderProps) {
	const [content, setContent] = useState('')
	const [subject, setSubject] = useState('')
	const [hideComments, setHideComments] = useState(false)
	const [hideLikes, setHideLikes] = useState(false)
	const [files, setFiles] = useState<FileList | null>(null)
	const tryPost = async ({navigate, addr}: tryPostProps) => {
		const formData = new FormData()
		formData.append('content', content)
		formData.append('hideComments', "" + hideComments)
		formData.append('hideLikes', "" + hideLikes)
		formData.append('files', 'https://assets.community.lomography.com/86/93d57e0bd8e88f6890c1687803700ab45f3007/576x576x2.jpg?auth=fb4474f73f10307f800cfe75a5a7052702f6d316')
		try {
			const accessToken = 1
			const response = await axios.post(
				'https://waffle5gram.shop/api/v1/post',
				formData,
				{
					headers: {
						"Authorization": `Bearer ${accessToken}`,
						"Content-Type": 'multipart/form-data' 
					}
				}
			)
			console.log(response)
		} catch (error) {
			alert('포스트 생성 실패')
		}
		navigate(addr)
	}
	return (
		<PostContext.Provider
			value={{
				content,
				hideComments,
				hideLikes,
				files, 
				subject,
				setHideComments,
				setHideLikes,
				setFiles,
				setContent,
				setSubject,
				tryPost
			}}
		>
			{children}
		</PostContext.Provider>
	)
}

export function usePostContext() {
	const context = useContext(PostContext)
	if (!context) {
		throw new Error('useUserContext must be used within a UserProvider')
	}
	return context
}
