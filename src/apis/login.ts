import axios, { AxiosError } from 'axios';

import { baseURL } from '../constants.ts';
// import { useAuthContext } from '../contexts/AuthContext';
// import { useUserContext } from '../contexts/UserContext';
import { APIErrorResponseType, UserContactType, UserLinkType } from '../types';

import { getUserInformation } from './user';

type LoginType = {
	// username, password로 로그인
	username: string;
	password: string;

	// 로그인 성공 시 accessToken 받아와서 저장
	setAccessToken: (accessToken: string) => void;

	// 받아온 accessToken 이용해 유저 정보 받아오기
	setUserId: (userId: number) => void;
	setUsername: (username: string) => void;
	setName: (name: string) => void;
	setBirthday: (birthday: Date) => void;
	setIsMyAccountPrivate: (isMyAccountPrivate: boolean) => void;
	setGender: (gender: string) => void;
	setIsCustomGender: (isCustomGender: boolean) => void;
	setProfileImageUrl: (profileImageUrl: string) => void;
	setBio: (bio: string) => void;
	setUserLinks: (userLinks: UserLinkType[]) => void;
	setContacts: (contacts: UserContactType[]) => void;
	setPostNumber: (postNumber: number) => void;
	setFollowingNumber: (followingNumber: number) => void;
	setFollowerNumber: (followerNumber: number) => void;
};

// type SignUpProps = {
// 	navigate: (to: string) => void;
// 	addr: string;
// };

export const tryLogin = async ({
	username,
	password,

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
}: LoginType) => {
	try {
		const response = await axios.post(
			`${baseURL}/api/v1/auth/login`,
			{
				username: username,
				password: password,
			},
			{
				headers: {
					'Content-Type': 'application/json',
				},
			}
		);

		const accessToken = response.data.access_token;
		setAccessToken(accessToken);

		const info = await getUserInformation(username, accessToken);
		if (info) {
			const {
				userId,
				username,
				name,
				birthday,
				isPrivate,
				gender,
				isCustomGender,
				profileImageUrl,
				bio,
				userLinks,
				contacts,
				postNumber,
				followingNumber,
				followerNumber,
			} = info;

			setUserId(userId);
			setUsername(username);
			setName(name);
			setBirthday(birthday);
			setIsMyAccountPrivate(isPrivate);
			setGender(gender);
			setIsCustomGender(isCustomGender);
			setProfileImageUrl(profileImageUrl);
			setBio(bio);
			setUserLinks(userLinks);
			setContacts(contacts);
			setPostNumber(postNumber);
			setFollowingNumber(followingNumber);
			setFollowerNumber(followerNumber);
		}
	} catch (error) {
		const err = error as AxiosError<APIErrorResponseType>;

		if (err.response && err.response.data) {
			alert(err.response.data.error);
		} else {
			alert('Error occurred');
		}

		return null;
	}
};

// export const trySignUp = async ({ navigate, addr }: SignUpProps) => {
// 	try {
// 		const { username, password, name, email, birthday } = useAuthContext();
// 		const phoneRegex = /^010\d{8}$/i;
// 		const year = birthday.getFullYear();
// 		const month = String(birthday.getMonth() + 1).padStart(2, '0');
// 		const day = String(birthday.getDate()).padStart(2, '0');
// 		const formatted = `${year}-${month}-${day}`;
// 		await axios.post('https://waffle5gram.shop/api/v1/auth/signup', {
// 			username: username,
// 			name: name,
// 			password: password,
// 			contact: email,
// 			contactType: phoneRegex.test(email) ? 'phone' : 'email',
// 			birthday: formatted,
// 		});
// 		tryLogin({ username, password });
// 		navigate(addr);
// 	} catch (error) {
// 		const err = error as AxiosError<APIErrorResponseType>;
//
// 		if (err.response && err.response.data) {
// 			alert(err.response.data.error);
// 		} else {
// 			alert('Error occurred');
// 		}
//
// 		return null;
// 	}
// };
//
// export const resetAccessToken = async () => {
// 	const { setAccessToken } = useUserContext();
// 	try {
// 		const response = await axios.get(
// 			'https://waffle5gram.shop/api/v1/auth/refresh_token'
// 		);
// 		setAccessToken(response.data.access_token);
// 		console.log('액세스 토큰 : ' + response.data.access_token);
// 	} catch (error) {
// 		const err = error as AxiosError<APIErrorResponseType>;
// 		if (err.response && err.response.data) {
// 			alert(err.response.data.error);
// 		} else {
// 			alert('Error occurred');
// 		}
//
// 		return null;
// 	}
// };
