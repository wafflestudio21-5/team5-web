import axios, { AxiosError } from 'axios';

import { baseURL } from '../constants.ts';
import { APIErrorResponseType, UserType } from '../types.ts';

import { getUserInformation } from './user.ts';

// 유저 정보 userContext에 fetch
export const fetchUserInformation = async (
	accessToken: string,
	currentUser: UserType,
	setCurrentUser: (user: UserType) => void
) => {
	try {
		const response = await getUserInformation(
			currentUser.username,
			accessToken
		);

		setCurrentUser(response);
	} catch (error) {
		const err = error as AxiosError<APIErrorResponseType>;
		if (err.response && err.response.data) {
			alert(err.response.data.message);
		} else {
			alert('Error occurred');
		}
	}
};

// 계정 비공개로 변경
export const updateAccountToPrivate = async (
	accessToken: string
): Promise<boolean> => {
	try {
		await axios.put(
			`${baseURL}/api/v1/account/toPrivate`,
			{
				message: 'Change non-private account to private account.',
			},
			{
				headers: {
					Authorization: `Bearer ${accessToken}`,
				},
			}
		);

		return true;
	} catch (error) {
		const err = error as AxiosError<APIErrorResponseType>;

		if (err.response && err.response.data) {
			alert(err.response.data.message);
		} else {
			alert('Error occurred');
		}

		return false;
	}
};

// 계정 공개로 변경
export const updateAccountToOpen = async (
	accessToken: string
): Promise<boolean> => {
	try {
		await axios.put(
			`${baseURL}/api/v1/account/toOpen`,
			{
				message: 'Change private account to non-private account.',
			},
			{
				headers: {
					Authorization: `Bearer ${accessToken}`,
				},
			}
		);

		return true;
	} catch (error) {
		const err = error as AxiosError<APIErrorResponseType>;

		if (err.response && err.response.data) {
			alert(err.response.data.message);
		} else {
			alert('Error occurred');
		}

		return false;
	}
};

// 프로필 사진 추가
export const addProfileImage = async (
	accessToken: string,
	profileImage: FormData
): Promise<boolean> => {
	try {
		await axios.post(
			`${baseURL}/api/v1/account/profileEdit/image`,
			profileImage,
			{
				headers: {
					Authorization: `Bearer ${accessToken}`,
					'Content-Type': 'multipart/form-data',
				},
			}
		);

		return true;
	} catch (error) {
		const err = error as AxiosError<APIErrorResponseType>;

		if (err.response && err.response.data) {
			alert(err.response.data.message);
		} else {
			alert('Error occurred');
		}

		return false;
	}
};

// 프로필 사진 삭제
export const deleteProfileImage = async (
	accessToken: string
): Promise<boolean> => {
	try {
		await axios.delete(`${baseURL}/api/v1/account/profileEdit/image`, {
			headers: {
				Authorization: `Bearer ${accessToken}`,
			},
		});

		return true;
	} catch (error) {
		const err = error as AxiosError<APIErrorResponseType>;

		if (err.response && err.response.data) {
			alert(err.response.data.message);
		} else {
			alert('Error occurred');
		}

		return false;
	}
};

// 유저 이름 편집
export const editName = async (
	accessToken: string,
	name: string
): Promise<boolean> => {
	try {
		await axios.put(
			`${baseURL}/api/v1/account/profileEdit/name`,
			{
				name: name,
				message: 'Update name in profile.',
			},
			{
				headers: {
					Authorization: `Bearer ${accessToken}`,
					'Content-Type': 'application/json',
				},
			}
		);

		return true;
	} catch (error) {
		const err = error as AxiosError<APIErrorResponseType>;

		if (err.response && err.response.data) {
			alert(err.response.data.message);
		} else {
			alert('Error occurred');
		}

		return false;
	}
};

// 유저 사용자 이름(username) 편집
// accessToken도 같이 온다
export const editUsername = async (
	accessToken: string,
	username: string
): Promise<string | null> => {
	try {
		const response = await axios.put(
			`${baseURL}/api/v1/account/profileEdit/username`,
			{
				username: username,
				message: 'Update name in profile.',
			},
			{
				headers: {
					Authorization: `Bearer ${accessToken}`,
					'Content-Type': 'application/json',
				},
			}
		);

		return response.data.accessToken;
	} catch (error) {
		const err = error as AxiosError<APIErrorResponseType>;

		if (err.response && err.response.status === 409) {
			alert(err.response.data.message);
		} else {
			alert('Error occurred');
		}

		return null;
	}
};

// 유저 소개 편집
export const editBio = async (
	accessToken: string,
	bio: string
): Promise<boolean> => {
	try {
		await axios.put(
			`${baseURL}/api/v1/account/profileEdit/bio`,
			{
				bio: bio,
				message: 'Update name in profile.',
			},
			{
				headers: {
					Authorization: `Bearer ${accessToken}`,
					'Content-Type': 'application/json',
				},
			}
		);

		return true;
	} catch (error) {
		const err = error as AxiosError<APIErrorResponseType>;

		if (err.response && err.response.data) {
			alert(err.response.data.message);
		} else {
			alert('Error occurred');
		}

		return false;
	}
};

// 유저 성별 편집
export const editGender = async (
	accessToken: string,
	gender: string,
	isCustomGender: boolean
): Promise<boolean> => {
	try {
		await axios.put(
			`${baseURL}/api/v1/account/profileEdit/gender`,
			{
				gender: gender,
				isCustomGender: isCustomGender,
				message: 'Update pronoun in profile.',
			},
			{
				headers: {
					Authorization: `Bearer ${accessToken}`,
					'Content-Type': 'application/json',
				},
			}
		);

		return true;
	} catch (error) {
		const err = error as AxiosError<APIErrorResponseType>;

		if (err.response && err.response.data) {
			alert(err.response.data.message);
		} else {
			alert('Error occurred');
		}

		return false;
	}
};

// 유저 링크 추가
export const addLink = async (
	accessToken: string,
	linkTitle: string,
	link: string
): Promise<boolean> => {
	try {
		await axios.post(
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

		return true;
	} catch (error) {
		const err = error as AxiosError<APIErrorResponseType>;

		if (err.response && err.response.data) {
			alert(err.response.data.message);
		} else {
			alert('Error occurred');
		}

		return false;
	}
};

// 유저 링크 수정
export const updateLink = async (
	accessToken: string,
	linkId: number,
	linkTitle: string,
	link: string
): Promise<boolean> => {
	try {
		await axios.put(
			`${baseURL}/api/v1/account/profileEdit/link/${linkId}`,
			{
				userLinks: {
					linkTitle: linkTitle,
					link: link,
				},
				message: 'Add user link in profile.',
			},
			{
				headers: {
					Authorization: `Bearer ${accessToken}`,
					'Content-Type': 'application/json',
				},
			}
		);

		return true;
	} catch (error) {
		const err = error as AxiosError<APIErrorResponseType>;

		if (err.response && err.response.data) {
			alert(err.response.data.message);
		} else {
			alert('Error occurred');
		}

		return false;
	}
};

// 유저 링크 삭제
export const deleteLink = async (
	accessToken: string,
	linkId: number
): Promise<boolean> => {
	try {
		await axios.delete(`${baseURL}/api/v1/account/profileEdit/link/${linkId}`, {
			headers: {
				Authorization: `Bearer ${accessToken}`,
			},
		});

		return true;
	} catch (error) {
		const err = error as AxiosError<APIErrorResponseType>;

		if (err.response && err.response.data) {
			alert(err.response.data.message);
		} else {
			alert('Error occurred');
		}

		return false;
	}
};
