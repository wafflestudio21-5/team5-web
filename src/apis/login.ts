import axios, { AxiosError } from 'axios';

import { baseURL } from '../constants.ts';
// import { useAuthContext } from '../contexts/AuthContext';
// import { useUserContext } from '../contexts/UserContext';
import { APIErrorResponseType } from '../types';

type LoginType = {
	username: string;
	password: string;
};

// type SignUpProps = {
// 	navigate: (to: string) => void;
// 	addr: string;
// };

export const tryLogin = async ({ username, password }: LoginType) => {
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

		return response.data.accessToken;
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
