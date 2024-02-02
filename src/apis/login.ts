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

type FacebookSignupType = {
	username: string;
	birthday: Date;
};

export const tryLogin = async ({ username, password }: LoginType) => {
	try {
		const response = await fetch(
			'https://api.waffle5gram.com/api/v1/auth/login',
			{
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				credentials: 'include',
				body: JSON.stringify({
					username: username,
					password: password,
				}),
			}
		);

		if (!response.ok) {
			console.error('요청이 실패했습니다.');
			alert('아이디나 패스워드가 다릅니다.');
			return null;
		} else {
			const data = await response.json();
			return data['accessToken'];
		}
	} catch (error) {
		alert(error);
		console.error('오류 발생:', error);
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
		const year = birthday.getFullYear();
		const month = String(birthday.getMonth() + 1).padStart(2, '0');
		const day = String(birthday.getDate()).padStart(2, '0');
		const formatted = `${year}-${month}-${day}`;
		const contact = phoneRegex.test(email)
			? `${email.slice(0, 3)}-${email.slice(3, 7)}-${email.slice(7)}`
			: email;
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
		const refreshToken = localStorage.getItem('refreshToken');
		const response = await axios.post(`${baseURL}/api/v1/auth/refresh_token`, {
			refreshToken: refreshToken,
		});

		return response.data.accessToken;
	} catch (error) {
		const err = error as AxiosError<APIErrorResponseType>;

		if (err.response && err.response.data) {
			alert(err.response);
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

export const tryFacebookSignup = async ({
	username,
	birthday,
}: FacebookSignupType) => {
	try {
		const refreshToken = localStorage.getItem('refreshToken');
		const response = await axios.post(
			`${baseURL}/api/v1/auth/facebook_signup`,
			{
				username: username,
				birthday: birthday,
				refreshToken: refreshToken,
			}
		);
		return response.data.accessToken;
	} catch (error) {}
};
