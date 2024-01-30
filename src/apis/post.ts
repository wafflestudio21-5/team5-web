import axios, { AxiosError } from 'axios';
import { baseURL } from '../constants';
import { resetAccessToken } from './login';
import { APIErrorResponseType } from '../types';

type TryPostType = {
	content: string;
	files: FileList;
	accessToken: string;
};

export const tryPost = async ({ content, files, accessToken }: TryPostType) => {
	const api = axios.create({ baseURL: baseURL });
	const formData = new FormData();
	formData.append('content', content);
	for (let i = 0; i < files.length; i++) {
		const file = files[i];
		const blob = new Blob([file], { type: file.type });
		formData.append('files', blob);
	}
	try {
		const response = await axios.post(`${baseURL}/api/v1/posts`, formData, {
			headers: {
				Authorization: `Bearer ${accessToken}`,
				'Content-Type': 'multipart/form-data',
			},
		});
		console.log(response);
		return response;
	} catch (error) {
		const err = error as AxiosError<APIErrorResponseType>;
		console.log(err.response);
		if (err.response && err.response.status == 401) {
			try {
				const newAccessToken = await resetAccessToken();
				const retryResponse = await api.post(
					`${baseURL}/api/v1/posts`,
					formData,
					{
						headers: {
							Authorization: `Bearer ${newAccessToken}`,
							'Content-Type': 'multipart/form-data',
						},
					}
				);
				console.log(retryResponse);
				return retryResponse;
			} catch (refreshError) {
				console.error('토큰 재발급 실패 : ', refreshError);
				return null;
			}
		} else if (err.response && err.response.data) {
			alert(err.response.data.error);
		} else {
			alert('Error occurred');
		}

		return null;
	}
};
