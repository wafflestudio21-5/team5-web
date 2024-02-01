import axios, { AxiosError, AxiosInstance } from 'axios';

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
		const response = await fetch('https://api.example.com/login', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			credentials: 'include',
			body: JSON.stringify({
				username: username,
				password: password,
			}),
		});

		if (!response.ok) {
			console.error('요청이 실패했습니다.');
			return;
		}

		const data = await response.json();
		console.log('데이터:', data);
	} catch (error) {
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
	axios.defaults.withCredentials = true;
	const axiosWithCredentials: AxiosInstance = axios.create({
		baseURL: baseURL,
	});
	try {
		const response = await axiosWithCredentials.get(
			`/api/v1/auth/refresh_token`
		);

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
