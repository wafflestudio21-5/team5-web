import axios, { AxiosError } from 'axios';

import { baseURL } from '../constants.ts';
import { APIErrorResponseType } from '../types.ts';

// 계정 비공개로 변경
export const updateAccountToPrivate = async (
	accessToken: string
): Promise<string | null> => {
	try {
		const response = await axios.put(`${baseURL}/api/v1/account/toprivate`, {
			headers: {
				Authorization: `Bearer ${accessToken}`,
			},
		});

		return response.data.message;
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

// 계정 공개로 변경
export const updateAccountToOpen = async (
	accessToken: string
): Promise<string | null> => {
	try {
		const response = await axios.put(`${baseURL}/api/v1/account/toopen`, {
			headers: {
				Authorization: `Bearer ${accessToken}`,
			},
		});

		return response.data.message;
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

// 프로필 이미지 추가
export const postProfileImage = async (
	accessToken: string,
	profileImageUrl: string
) => {
	try {
		const response = await axios.post(
			`${baseURL}/api/v1/account/profileEdit/image`,
			{
				profileImageUrl: profileImageUrl,
			},
			{
				headers: {
					Authorization: `Bearer ${accessToken}`,
					'Content-Type': 'application/json',
				},
			}
		);

		return response.data;
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

// 프로필 사진 삭제
export const deleteProfileImage = async (accessToken) => {
	try {
		const response = await axios.delete('/api/v1/account/profileEdit/image', {
			headers: {
				Authorization: `Bearer ${accessToken}`,
			},
			data: {
				message: 'Delete profile image.',
			},
		});
		return response.data; // Contains the message and empty profile image URL
	} catch (error) {
		// Handle errors here
		console.error(
			'Error deleting profile image',
			error.response ? error.response.data : error
		);
		throw error;
	}
};
