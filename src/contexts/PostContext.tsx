import { createContext, ReactNode, useContext, useState } from 'react';
import { CategoryType } from '../types';

export type PostContextData = {
	content: string;
	hideComments: boolean;
	hideLikes: boolean;
	files: FileList | null;
	previewUrls: string[];
	category: CategoryType | null;
	fileOrder: number[];
	fileNum: number[];
	setHideComments: (b: boolean) => void;
	setHideLikes: (b: boolean) => void;
	setFiles: (f: FileList | null) => void;
	setPreviewUrls: (s: string[]) => void;
	setContent: (s: string) => void;
	setCategory: (s: CategoryType | null) => void;
	setFileOrder: (n: number[]) => void;
	setFileNum: (n: number[]) => void;
	resetPost: () => void;
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
	const [previewUrls, setPreviewUrls] = useState<string[]>([]);
	const [fileOrder, setFileOrder] = useState<number[]>([]);
	const [fileNum, setFileNum] = useState<number[]>([]);
	const resetPost = () => {
		setContent('');
		setHideComments(false);
		setHideLikes(false);
		setCategory(null);
		setFiles(null);
		setPreviewUrls([]);
		setFileNum([]);
		setFileOrder([]);
	};

	return (
		<PostContext.Provider
			value={{
				content,
				hideComments,
				hideLikes,
				files,
				previewUrls,
				category,
				fileOrder,
				fileNum,
				setHideComments,
				setHideLikes,
				setFiles,
				setPreviewUrls,
				setContent,
				setCategory,
				setFileNum,
				setFileOrder,
				resetPost,
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
