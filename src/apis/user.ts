import axios, { AxiosError } from 'axios';

import { baseURL } from '../constants.ts';
import { APIErrorResponseType, MiniProfileType, UserType } from '../types.ts';

// 1. 유저 정보 가져오기
export const getUserInformation = async (
	username: string,
	accessToken: string
): Promise<UserType | null> => {
	try {
		const response = await axios.get<UserType>(
			`${baseURL}/api/v1/account/${username}`,
			{
				headers: {
					Authorization: `Bearer ${accessToken}`,
				},
				data: {
					message: 'Retrieve user profile.',
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

type FollowStatusResponseType = {
	isFollow: boolean;
	message: string;
};

// 2. 내가 이 유저를 팔로우 하는지 판단
export const getUserFollowStatus = async (
	username: string,
	accessToken: string
): Promise<boolean | null> => {
	try {
		const response = await axios.get<FollowStatusResponseType>(
			`${baseURL}/api/v1/friendship/${username}/follow`,
			{
				headers: {
					Authorization: `Bearer ${accessToken}`,
				},
				data: {
					message: 'Retrieve user follow.',
				},
			}
		);

		return response.data.isFollow;
	} catch (error) {
		const err = error as AxiosError<APIErrorResponseType>;

		if (err.response) {
			if (
				err.response.status === 404 &&
				err.response.data.error === 'User not follow.'
			) {
				return false;
			} else {
				alert(err.response.data.error);
			}
		} else {
			alert('Error occurred');
		}

		return null;
	}
};

// 3. 이 유저가 나를 팔로우 하는지 판단
export const getUserFollowMeStatus = async (
	followerUsername: string,
	accessToken: string
): Promise<boolean | null> => {
	try {
		await axios.get(
			`${baseURL}/api/v1/friendship/${followerUsername}/follower`,
			{
				headers: {
					Authorization: `Bearer ${accessToken}`,
				},
				data: {
					message: 'Retrieve follower.',
				},
			}
		);

		return true;
	} catch (error) {
		const err = error as AxiosError<APIErrorResponseType>;

		if (err.response) {
			if (
				err.response.status === 404 &&
				err.response.data.error === 'Not follower.'
			) {
				return false;
			} else {
				alert(err.response.data.error);
			}
		} else {
			alert('Error occurred');
		}

		return null;
	}
};

type FollowRequestResponseType = {
	followRequestsId: number;
	followerUserId: number;
	followeeUserId: number;
	requestFollow: boolean;
	message: string;
};

// 4. 비공개 유저에게 팔로우 요청을 보내놨는지 판단
export const getFollowRequestStatus = async (
	username: string,
	accessToken: string
): Promise<boolean | null> => {
	try {
		const response = await axios.get<FollowRequestResponseType>(
			`${baseURL}/api/v1/friendship/${username}/follow/request`,
			{
				headers: {
					Authorization: `Bearer ${accessToken}`,
				},
				data: {
					message: 'Request follow to private user.',
				},
			}
		);

		return response.data.requestFollow;
	} catch (error) {
		const err = error as AxiosError<APIErrorResponseType>;

		if (err.response) {
			if (
				err.response.status === 404 &&
				err.response.data.error === 'Request not Found.'
			) {
				return false;
			} else {
				alert(err.response.data.error);
			}
		} else {
			alert('Error occurred');
		}

		return null;
	}
};

// 5. 내가 비공개일 때 나에게 팔로우 요청을 보냈는지 판단
export const getFollowRequestToMeStatus = async (
	followerusername: string,
	accessToken: string
): Promise<boolean | null> => {
	try {
		const response = await axios.get<FollowRequestResponseType>(
			`${baseURL}/api/v1/friendship/${followerusername}/request`,
			{
				headers: {
					Authorization: `Bearer ${accessToken}`,
				},
				data: {
					message: 'Retrieve user follow request.',
				},
			}
		);

		return response.data.requestFollow;
	} catch (error) {
		const err = error as AxiosError<APIErrorResponseType>;

		if (err.response) {
			if (
				err.response.status === 404 &&
				err.response.data.error === 'Request not Found.'
			) {
				return false;
			} else {
				alert(err.response.data.error);
			}
		} else {
			alert('Error occurred');
		}

		return null;
	}
};

// 비공개 유저에게 팔로우 요청 보내기
export const requestFollowToPrivateUser = async (
	username: string,
	accessToken: string
): Promise<boolean | null> => {
	try {
		const response = await axios.post<FollowRequestResponseType>(
			`${baseURL}/api/v1/friendship/${username}/follow/request`,
			{
				message: 'Request follow to private user.',
			},
			{
				headers: {
					Authorization: `Bearer ${accessToken}`,
				},
				data: {
					message: 'Request follow to private user.',
				},
			}
		);

		return response.data.requestFollow;
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

// 비공개 유저에게 보낸 팔로우 요청 취소
export const cancelRequestFollowToPrivateUser = async (
	username: string,
	accessToken: string
): Promise<boolean | null> => {
	try {
		const response = await axios.delete(
			`${baseURL}/api/v1/friendship/${username}/follow/request`,
			{
				headers: {
					Authorization: `Bearer ${accessToken}`,
				},
				data: {
					message: 'Delete follow request to private user.',
				},
			}
		);

		return response.data.requestFollow;
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

type FollowResponseType = {
	followsId: number;
	followerUserId: number;
	followeeUserId: number;
	message: string;
};

// 공개 유저를 팔로우
export const followPublicUser = async (
	username: string,
	accessToken: string
): Promise<FollowResponseType | null> => {
	try {
		const response = await axios.post<FollowResponseType>(
			`${baseURL}/api/v1/friendship/${username}/follow`,
			{
				message: 'Follow Non-private user.',
			},
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

// 공개 유저를 언팔로우
export const unfollowUser = async (
	username: string,
	accessToken: string
): Promise<{ message: string } | null> => {
	try {
		const response = await axios.delete(
			`${baseURL}/api/v1/friendship/${username}/follow`,
			{
				headers: {
					Authorization: `Bearer ${accessToken}`,
				},
				data: {
					message: 'Unfollow user.',
				},
			}
		);

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

// 팔로워 삭제
export const deleteFollower = async (
	followerusername: string,
	accessToken: string
): Promise<string | null> => {
	try {
		const response = await axios.delete(
			`${baseURL}/api/v1/friendship/${followerusername}/follower`,
			{
				headers: {
					Authorization: `Bearer ${accessToken}`,
				},
				data: {
					message: 'Delete follower.',
				},
			}
		);

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

type MiniProfileListResponseType = {
	miniProfiles: MiniProfileType[];
};

// 팔로워 목록 가져오기
export const getFollowerList = async (
	username: string,
	accessToken: string
): Promise<MiniProfileType[] | null> => {
	try {
		const response = await axios.get<MiniProfileListResponseType>(
			`${baseURL}/api/v1/friendship/${username}/followerlist`,
			{
				headers: {
					Authorization: `Bearer ${accessToken}`,
				},
			}
		);

		return response.data.miniProfiles;
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

// 팔로잉 목록 가져오기
export const getFollowingList = async (
	username: string,
	accessToken: string
): Promise<MiniProfileType[] | null> => {
	try {
		const response = await axios.get<MiniProfileListResponseType>(
			`${baseURL}/api/v1/friendship/${username}/followinglist`,
			{
				headers: {
					Authorization: `Bearer ${accessToken}`,
				},
			}
		);

		return response.data.miniProfiles;
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

// 계정 비공개로 변경
export const updateAccountToPrivate = async (
	accessToken: string
): Promise<string | null> => {
	try {
		const response = await axios.put(
			`${baseURL}/api/v1/account/toprivate`,
			{
				message: 'Change non-private account to private account.',
			},
			{
				headers: {
					Authorization: `Bearer ${accessToken}`,
				},
			}
		);

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
		const response = await axios.put(
			`${baseURL}/api/v1/account/toopen`,
			{
				message: 'Change private account to non-private account.',
			},
			{
				headers: {
					Authorization: `Bearer ${accessToken}`,
				},
			}
		);

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
