import { createContext, ReactNode, useContext, useState } from 'react';

export type PostContextData = {
	content: string;
	hideComments: boolean;
	hideLikes: boolean;
	files: FileList | null;
	subject: string;
	setHideComments: (b: boolean) => void;
	setHideLikes: (b: boolean) => void;
	setFiles: (f: FileList | null) => void;
	setContent: (s: string) => void;
	setSubject: (s: string) => void;
};

export const PostContext = createContext<PostContextData | null>(null);

type ProviderProps = {
	children: ReactNode;
};
export function PostProvider({ children }: ProviderProps) {
	const [content, setContent] = useState('');
	const [subject, setSubject] = useState('');
	const [hideComments, setHideComments] = useState(false);
	const [hideLikes, setHideLikes] = useState(false);
	const [files, setFiles] = useState<FileList | null>(null);

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
			}}
		>
			{children}
		</PostContext.Provider>
	);
}

export function usePostContext() {
	const context = useContext(PostContext);
	if (!context) {
		throw new Error('useUserContext must be used within a UserProvider');
	}
	return context;
}
