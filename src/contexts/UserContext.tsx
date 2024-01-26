import { createContext, ReactNode, useContext, useState } from 'react';
<<<<<<< HEAD
import { UserLink, UserContact } from '../types';
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
	userLinks: UserLink[];
	contacts: UserContact[];
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
	setUserLinks: (links: UserLink[]) => void;
	setContacts: (contacts: UserContact[]) => void;
	setPostNumber: (n: number) => void;
	setFollowerNumber: (n: number) => void;
	setFollowingNumber: (n: number) => void;
=======

import { UserLinkType, UserContactType } from '../types';

export type UserContextData = {
	accessToken: string;
	userId: number;
	username: string;
	name: string;
	birthday: Date;
	isMyAccountPrivate: boolean;
	gender: string;
	isCustomGender: boolean;
	profileImageUrl: string;
	bio: string;
	userLinks: UserLinkType[];
	contacts: UserContactType[];
	postNumber: number;
	followingNumber: number;
	followerNumber: number;

	setAccessToken: (s: string) => void;
	setUserId: (n: number) => void;
	setUsername: (s: string) => void;
	setName: (s: string) => void;
	setBirthday: (d: Date) => void;
>>>>>>> 6293c39bf0e9876a8cfc643ac9e3775dfa6d7e32
	setIsMyAccountPrivate: (b: boolean) => void;
	setGender: (s: string) => void;
	setIsCustomGender: (b: boolean) => void;
	setProfileImageUrl: (s: string) => void;
	setBio: (s: string) => void;
	setUserLinks: (links: UserLinkType[]) => void;
	setContacts: (contacts: UserContactType[]) => void;
	setPostNumber: (n: number) => void;
	setFollowingNumber: (n: number) => void;
	setFollowerNumber: (n: number) => void;
};

export const UserContext = createContext<UserContextData | null>(null);

type ProviderProps = {
	children: ReactNode;
};
export function UserProvider({ children }: ProviderProps) {
	const [accessToken, setAccessToken] = useState('');
	const [userId, setUserId] = useState(0);
<<<<<<< HEAD
	const [name, setName] = useState('');
	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');
=======
	const [username, setUsername] = useState('');
	const [name, setName] = useState('');
>>>>>>> 6293c39bf0e9876a8cfc643ac9e3775dfa6d7e32
	const [birthday, setBirthday] = useState(new Date());
	const [isMyAccountPrivate, setIsMyAccountPrivate] = useState(false);
	const [gender, setGender] = useState('');
	const [isCustomGender, setIsCustomGender] = useState(false);
	const [profileImageUrl, setProfileImageUrl] = useState('');
	const [bio, setBio] = useState('');
<<<<<<< HEAD
	const [userLinks, setUserLinks] = useState<UserLink[]>([]);
	const [contacts, setContacts] = useState<UserContact[]>([]);
=======
	const [userLinks, setUserLinks] = useState<UserLinkType[]>([]);
	const [contacts, setContacts] = useState<UserContactType[]>([]);
>>>>>>> 6293c39bf0e9876a8cfc643ac9e3775dfa6d7e32
	const [postNumber, setPostNumber] = useState(0);
	const [followingNumber, setFollowingNumber] = useState(0);
	const [followerNumber, setFollowerNumber] = useState(0);

	return (
		<UserContext.Provider
			value={{
				accessToken,
				userId,
<<<<<<< HEAD
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
=======
				username,
				name,
				birthday,
				gender,
				isMyAccountPrivate,
				isCustomGender,
				profileImageUrl,
				bio,
				userLinks,
				contacts,
				postNumber,
				followingNumber,
				followerNumber,
				setAccessToken,
				setUserId,
				setUsername,
				setName,
				setBirthday,
>>>>>>> 6293c39bf0e9876a8cfc643ac9e3775dfa6d7e32
				setIsMyAccountPrivate,
				setGender,
				setIsCustomGender,
				setProfileImageUrl,
				setBio,
				setUserLinks,
				setContacts,
				setPostNumber,
				setFollowingNumber,
				setFollowerNumber,
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
