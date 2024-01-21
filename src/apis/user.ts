import axios, { AxiosError } from 'axios';

import { baseURL } from '../constants.ts';
import { UserType } from '../types.ts';

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

// 내가 이 유저를 팔로우 하는지 판단
type FollowStatusResponseType = {
	isFollow: boolean;
	message: string;
};

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

// 이 유저가 나를 팔로우 하는지 판단
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
	} catch (error) {
		return false;
	}
};

// 비공개 유저에게 팔로우 요청을 보내놨는지 판단
type FollowRequestResponse = {
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
		const response = await axios.get<FollowRequestResponse>(
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
