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

	currentUser: UserType;
	setCurrentUser: (user: UserType) => void;

	logout: () => void;

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
	const logout = () => {
		localStorage.clear();
		const cookies = document.cookie.split(';');

		for (let i = 0; i < cookies.length; i++) {
			const cookie = cookies[i];
			const eqPos = cookie.indexOf('=');
			const name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
			document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/;`;
		}
		setCurrentUser({} as UserType);
		setAccessToken('');
		setIsLoggedIn(false);
	};

	return (
		<UserContext.Provider
			value={{
				isLoggedIn,
				setIsLoggedIn,

				accessToken,
				setAccessToken,

				currentUser,
				setCurrentUser,

				logout,

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
