import { createContext, ReactNode, useContext, useState } from 'react';

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

export const UserContext = createContext<UserContextData>(
	{} as UserContextData
);

type ProviderProps = {
	children: ReactNode;
};

export function UserProvider({ children }: ProviderProps) {
	const [accessToken, setAccessToken] = useState('');
	const [userId, setUserId] = useState(0);
	const [username, setUsername] = useState('');
	const [name, setName] = useState('');
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

export const useUserContext = () => useContext(UserContext);
