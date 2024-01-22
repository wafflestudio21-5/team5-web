import axios from 'axios';

import { baseURL } from '../constants.ts';
import { UserType } from '../types.ts';

// 1. 유저 정보 가져오기
export const getUserInformation = async (
	username: string,
	accessToken: string
): Promise<UserType | undefined> => {
	try {
		const response = await axios.get<UserType>(
			`${baseURL}/api/v1/account/${username}`,
			{
				headers: {
					Authorization: `Bearer ${accessToken}`,
				},
			}
		);
		return response.data;
	} catch {
		alert('유저 정보를 불러오는데 실패했습니다.');
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
): Promise<boolean> => {
	try {
		const response = await axios.get<FollowStatusResponseType>(
			`${baseURL}/api/v1/friendship/${username}/follow`,
			{
				headers: {
					Authorization: `Bearer ${accessToken}`,
				},
			}
		);
		return response.data.isFollow;
	} catch {
		return false;
	}
};

// 3. 이 유저가 나를 팔로우 하는지 판단
export const getUserFollowMeStatus = async (
	followerUsername: string,
	accessToken: string
): Promise<boolean> => {
	try {
		await axios.get(
			`${baseURL}/api/v1/friendship/${followerUsername}/follower`,
			{
				headers: {
					Authorization: `Bearer ${accessToken}`,
				},
			}
		);
		return true;
	} catch {
		return false;
	}
};

// 4. 비공개 유저에게 팔로우 요청을 보내놨는지 판단
type FollowRequestResponseType = {
	followRequestsId: number;
	followerUserId: number;
	followeeUserId: number;
	requestFollow: boolean;
	message: string;
};

export const getFollowRequestStatus = async (
	username: string,
	accessToken: string
): Promise<boolean> => {
	try {
		const response = await axios.get<FollowRequestResponseType>(
			`${baseURL}/api/v1/friendship/${username}/follow/request`,
			{
				headers: {
					Authorization: `Bearer ${accessToken}`,
				},
			}
		);
		return response.data.requestFollow;
	} catch {
		return false;
	}
};

// 5. 내가 비공개일 때 나에게 팔로우 요청을 보냈는지 판단
export const getFollowRequestToMeStatus = async (
	followerusername: string,
	accessToken: string
): Promise<boolean> => {
	try {
		const response = await axios.get<FollowRequestResponseType>(
			`${baseURL}/api/v1/friendship/${followerusername}/request`,
			{
				headers: {
					Authorization: `Bearer ${accessToken}`,
				},
			}
		);
		return response.data.requestFollow;
	} catch {
		return false;
	}
};

// 비공개 유저에게 팔로우 요청 보내기
export const requestFollowToPrivateUser = async (
	username: string,
	accessToken: string
): Promise<boolean | undefined> => {
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
			}
		);
		return response.data.requestFollow;
	} catch {
		alert('팔로우 요청을 보내는데 실패했습니다.');
	}
};

// 비공개 유저에게 보낸 팔로우 요청 취소
// export const cancelRequestFollowToPrivateUser

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
): Promise<FollowResponseType | undefined> => {
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
	} catch {
		alert('팔로우에 실패했습니다.');
	}
};

// 공개 유저를 언팔로우
export const unfollowUser = async (
	username: string,
	accessToken: string
): Promise<{ message: string } | undefined> => {
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
	} catch {
		alert('언팔로우에 실패했습니다.');
	}
};

// 팔로워 삭제
export const deleteFollower = async (
	followerusername: string,
	accessToken: string
): Promise<string | undefined> => {
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
	} catch {
		alert('팔로워 삭제에 실패했습니다.');
	}
};
