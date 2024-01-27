import { createContext, useContext, useState } from 'react';

import {
	ProviderPropsType,
	UserContactType,
	UserLinkType,
	UserType,
} from '../types';

type UserContextType = {
	isLoggedIn: boolean;
	setIsLoggedIn: (b: boolean) => void;

	accessToken: string;
	setAccessToken: (s: string) => void;

	currentUser: UserType | null;
	setCurrentUser: (user: UserType) => void;

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
};

const UserContext = createContext<UserContextType>({} as UserContextType);

export function UserProvider({ children }: ProviderPropsType) {
	const [isLoggedIn, setIsLoggedIn] = useState(false);
	const [accessToken, setAccessToken] = useState('');
	const [currentUser, setCurrentUser] = useState<UserType>({} as UserType);

	return (
		<UserContext.Provider
			value={{
				isLoggedIn,
				setIsLoggedIn,

				accessToken,
				setAccessToken,

				currentUser,
				setCurrentUser,

				userId: currentUser.userId,
				username: currentUser.username,
				name: currentUser.name,
				birthday: currentUser.birthday,
				isMyAccountPrivate: currentUser.isPrivate,
				gender: currentUser.gender,
				isCustomGender: currentUser.isCustomGender,
				profileImageUrl: currentUser.profileImageUrl,
				bio: currentUser.bio,
				userLinks: currentUser.userLinks,
				contacts: currentUser.contacts,
				postNumber: currentUser.postNumber,
				followingNumber: currentUser.followingNumber,
				followerNumber: currentUser.followerNumber,
			}}
		>
			{children}
		</UserContext.Provider>
	);
}

export const useUserContext = () => useContext(UserContext);
