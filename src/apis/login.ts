import axios, { AxiosError } from 'axios';
import { useUserContext } from '../contexts/UserContext';
import { getUserInformation } from './user';
import { APIErrorResponseType } from '../types';
import { useAuthContext } from '../contexts/AuthContext';

type LoginType = {
	username: string;
	password: string;
};

type SignUpProps = {
	navigate: (to: string) => void;
	addr: string;
};

export const tryLogin = async ({ username, password }: LoginType) => {
	const { accessToken, setAccessToken } = useUserContext();
	const {
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
	} = useUserContext();
	try {
		const data = {
			username: username,
			password: password,
		};
		const response = await axios.post(
			'https://waffle5gram.shop/api/v1/auth/login',
			data,
			{
				headers: {
					'Content-Type': 'application/json',
				},
			}
		);
		setAccessToken(response.data.access_token);
		const info = getUserInformation(username, accessToken);
		info.then((info) => {
			if (info) {
				const {
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
					followerNumber,
					followingNumber,
					isPrivate,
				} = info;

				setUserId(userId);
				setName(name);
				setUsername(username);
				setPassword(password);
				setBirthday(new Date(birthday));
				setGender(gender);
				setIsCustomGender(isCustomGender);
				setProfileImageUrl(profileImageUrl);
				setBio(bio);
				setUserLinks(userLinks);
				setContacts(contacts);
				setPostNumber(postNumber);
				setFollowerNumber(followerNumber);
				setFollowingNumber(followingNumber);
				setIsMyAccountPrivate(isPrivate);
			}
		});
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

export const trySignUp = async ({ navigate, addr }: SignUpProps) => {
	try {
		const { username, password, name, email, birthday } = useAuthContext();
		const phoneRegex = /^010\d{8}$/i;
		const year = birthday.getFullYear();
		const month = String(birthday.getMonth() + 1).padStart(2, '0');
		const day = String(birthday.getDate()).padStart(2, '0');
		const formatted = `${year}-${month}-${day}`;
		await axios.post('https://waffle5gram.shop/api/v1/auth/signup', {
			username: username,
			name: name,
			password: password,
			contact: email,
			contactType: phoneRegex.test(email) ? 'phone' : 'email',
			birthday: formatted,
		});
		tryLogin({ username, password });
		navigate(addr);
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

export const resetAccessToken = async () => {
	const { setAccessToken } = useUserContext();
	try {
		const response = await axios.get(
			'https://waffle5gram.shop/api/v1/auth/refresh_token'
		);
		setAccessToken(response.data.access_token);
		console.log('액세스 토큰 : ' + response.data.access_token);
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
