import { createContext, ReactNode, useContext, useState } from 'react';
import { CategoryType } from '../types';

export type PostContextData = {
	content: string;
	hideComments: boolean;
	hideLikes: boolean;
	files: FileList | null;
	category: CategoryType | null;
	setHideComments: (b: boolean) => void;
	setHideLikes: (b: boolean) => void;
	setFiles: (f: FileList | null) => void;
	setContent: (s: string) => void;
	setCategory: (s: CategoryType | null) => void;
};

export const PostContext = createContext<PostContextData | null>(null);

type ProviderProps = {
	children: ReactNode;
};

export function PostProvider({ children }: ProviderProps) {
	const [content, setContent] = useState('');
	const [hideComments, setHideComments] = useState(false);
	const [hideLikes, setHideLikes] = useState(false);
	const [category, setCategory] = useState<CategoryType | null>(null);
	const [files, setFiles] = useState<FileList | null>(null);

	return (
		<PostContext.Provider
			value={{
				content,
				hideComments,
				hideLikes,
				files,
				category,
				setHideComments,
				setHideLikes,
				setFiles,
				setContent,
				setCategory,
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
