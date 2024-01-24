import { createContext, ReactNode, useContext, useState } from 'react';

import { UserLinkType, UserContactType } from '../types';

export type UserContextData = {
	accessToken: string;
	userId: number;
	name: string;
	username: string;
	password: string;
	birthday: Date;
	gender: string;
	isCustomGender: boolean;
	profileImageUrl: string;
	bio: string;
	userLinks: UserLinkType[];
	contacts: UserContactType[];
	postNumber: number;
	followingNumber: number;
	followerNumber: number;
	isMyAccountPrivate: boolean;
	setAccessToken: (s: string) => void;
	setUserId: (n: number) => void;
	setName: (s: string) => void;
	setUsername: (s: string) => void;
	setPassword: (s: string) => void;
	setBirthday: (d: Date) => void;
	setGender: (s: string) => void;
	setIsCustomGender: (b: boolean) => void;
	setProfileImageUrl: (s: string) => void;
	setBio: (s: string) => void;
	setUserLinks: (links: UserLinkType[]) => void;
	setContacts: (contacts: UserContactType[]) => void;
	setPostNumber: (n: number) => void;
	setFollowerNumber: (n: number) => void;
	setFollowingNumber: (n: number) => void;
	setIsMyAccountPrivate: (b: boolean) => void;
};

export const UserContext = createContext<UserContextData | null>(null);

type ProviderProps = {
	children: ReactNode;
};
export function UserProvider({ children }: ProviderProps) {
	const [accessToken, setAccessToken] = useState('');
	const [userId, setUserId] = useState(0);
	const [name, setName] = useState('');
	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');
	const [birthday, setBirthday] = useState(new Date());
	const [isMyAccountPrivate, setIsMyAccountPrivate] = useState(false);
	const [gender, setGender] = useState('');
	const [isCustomGender, setIsCustomGender] = useState(false);
	const [profileImageUrl, setProfileImageUrl] = useState('');
	const [bio, setBio] = useState('');
	const [userLinks, setUserLinks] = useState<UserLinkType[]>([]);
	const [contacts, setContacts] = useState<UserContactType[]>([]);
	const [postNumber, setPostNumber] = useState(0);
	const [followingNumber, setFollowingNumber] = useState(0);
	const [followerNumber, setFollowerNumber] = useState(0);

	return (
		<UserContext.Provider
			value={{
				accessToken,
				userId,
				name,
				username,
				password,
				birthday,
				gender,
				isCustomGender,
				profileImageUrl,
				bio,
				userLinks,
				contacts,
				postNumber,
				followingNumber,
				followerNumber,
				isMyAccountPrivate,
				setAccessToken,
				setUserId,
				setName,
				setUsername,
				setPassword,
				setBirthday,
				setGender,
				setIsCustomGender,
				setProfileImageUrl,
				setBio,
				setUserLinks,
				setContacts,
				setPostNumber,
				setFollowerNumber,
				setFollowingNumber,
				setIsMyAccountPrivate,
			}}
		>
			{children}
		</UserContext.Provider>
	);
}

export function useUserContext() {
	const context = useContext(UserContext);
	if (!context) {
		throw new Error('useUserContext must be used within a UserProvider');
	}
	return context;
}
