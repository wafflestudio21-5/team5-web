import axios, { AxiosError } from 'axios';

import { baseURL } from '../constants.ts';
import { APIErrorResponseType, UserLinkType } from '../types.ts';

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
export const addProfileImage = async (
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
export const deleteProfileImage = async (accessToken: string) => {
	try {
		const response = await axios.delete(
			`${baseURL}/api/v1/account/profileEdit/image`,
			{
				headers: {
					Authorization: `Bearer ${accessToken}`,
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

// 유저 이름 편집
export const editName = async (accessToken: string, name: string) => {
	try {
		const response = await axios.put(
			`${baseURL}/api/v1/account/profileEdit/name`,
			{
				name: name,
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

// 유저 사용자 이름(username) 편집
export const editUsername = async (accessToken: string, username: string) => {
	try {
		const response = await axios.put(
			`${baseURL}/api/v1/account/profileEdit/username`,
			{
				username: username,
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

// 유저 소개 편집
export const editBio = async (accessToken: string, bio: string) => {
	try {
		const response = await axios.put(
			`${baseURL}/api/v1/account/profileEdit/bio`,
			{
				bio: bio,
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

// 유저 성별 편집
export const editGender = async (
	accessToken: string,
	gender: string,
	isCustomGender: boolean
) => {
	try {
		const response = await axios.put(
			`${baseURL}/api/v1/account/profileEdit/gender`,
			{
				gender: gender,
				isCustomGender: isCustomGender,
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

// 유저 링크 추가
export const addLink = async (
	accessToken: string,
	linkTitle: string,
	link: string
) => {
	try {
		const response = await axios.post(
			`${baseURL}/api/v1/account/profileEdit/link`,
			{
				userLinks: {
					linkTitle: linkTitle,
					link: link,
				},
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

// 유저 링크 삭제
export const deleteLink = async (accessToken: string, linkId: string) => {
	try {
		const response = await axios.delete(
			`${baseURL}/api/v1/account/profileEdit/link/${linkId}`,
			{
				headers: {
					Authorization: `Bearer ${accessToken}`,
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
