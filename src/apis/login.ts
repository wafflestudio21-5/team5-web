import axios, { AxiosError } from 'axios';

import { baseURL } from '../constants.ts';
import { APIErrorResponseType } from '../types';

type SignUpType = {
	username: string;
	password: string;
	name: string;
	email: string;
	birthday: Date;
};

type LoginType = {
	username: string;
	password: string;
};

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
			alert('아이디 또는 비밀번호가 일치하지 않습니다.');
		} else {
			alert('Error occurred');
		}

		return null;
	}
};

export const trySignUp = async ({
	username,
	password,
	name,
	email,
	birthday,
}: SignUpType) => {
	try {
		const phoneRegex = /^010\d{8}$/i;
		console.log(phoneRegex.test(email) ? 'phone' : 'email');
		const year = birthday.getFullYear();
		const month = String(birthday.getMonth() + 1).padStart(2, '0');
		const day = String(birthday.getDate()).padStart(2, '0');
		const formatted = `${year}-${month}-${day}`;
		const contact = phoneRegex.test(email)
			? `${email.slice(0, 3)}-${email.slice(3, 7)}-${email.slice(7)}`
			: email;
		console.log(contact);
		const response = await axios.post(`${baseURL}/api/v1/auth/signup`, {
			username: username,
			name: name,
			password: password,
			contact: contact,
			contactType: phoneRegex.test(email) ? 'phone' : 'email',
			birthday: formatted,
		});
		return response;
	} catch (error) {
		const err = error as AxiosError<APIErrorResponseType>;

		if (err.response && err.response.data) {
			alert(err.response.data.message);
		} else {
			alert('Error occurred');
		}

		return null;
	}
};

export const resetAccessToken = async () => {
	try {
		const response = await axios.get(`${baseURL}/api/v1/auth/refresh_token`, {
			withCredentials: true,
		});

		return response.data.accessToken;
	} catch (error) {
		const err = error as AxiosError<APIErrorResponseType>;

		if (err.response && err.response.data) {
			alert(err.response.data.message);
		} else {
			alert('Error occurred');
		}

		return null;
	}
};
export const tryFacebookLogin = async () => {
	try {
		const response = await axios.get(`${baseURL}/api/v1/auth/facebook_login`);
		return response;
	} catch (error) {
		const err = error as AxiosError<APIErrorResponseType>;
		if (err.response && err.response.data) {
			alert(err.response.data.message);
		} else {
			alert('Error occurred');
		}

		return null;
	}
};
