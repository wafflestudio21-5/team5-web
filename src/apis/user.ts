import axios, { AxiosError } from 'axios';

import { baseURL } from '../constants.ts';
import {
	APIErrorResponseType,
	FollowListResponseType,
	MiniProfileType,
	MiniProfileWithIsRequestType,
	PostType,
	PreviewType,
	UserType,
} from '../types.ts';

import { PostResponseType, formatPostReponse } from './post.ts';

// 유저 정보 가져오기
export const getUserInformation = async (
	username: string,
	accessToken: string
): Promise<UserType> => {
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
	} catch (error) {
		const err = error as AxiosError<APIErrorResponseType>;
		if (err.response && err.response.data) {
			alert(err.response.data.message);
		} else {
			alert('Error occurred');
		}

		return {} as UserType;
	}
};

// 내가 이 유저를 팔로우 하는지 판단
export const getUserFollowStatus = async (
	username: string,
	accessToken: string
): Promise<boolean> => {
	try {
		const response = await axios.get(
			`${baseURL}/api/v1/friendship/${username}/follow`,
			{
				headers: {
					Authorization: `Bearer ${accessToken}`,
				},
			}
		);

		console.log(response);
		console.log(response.data);
		console.log(response.data.message);
		console.log('true');
		return true;
	} catch {
		console.log('false');
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
		const err = error as AxiosError<APIErrorResponseType>;

		if (err.response) {
			if (
				err.response.data.status === 404 &&
				err.response.data.message === 'Not follower.'
			) {
				return false;
			} else {
				alert(err.response.data.message);
			}
		} else {
			alert('Error occurred');
		}

		return false;
	}
};

// 비공개 유저에게 팔로우 요청을 보내놨는지 판단
export const getFollowRequestStatus = async (
	username: string,
	accessToken: string
): Promise<boolean> => {
	try {
		await axios.get(`${baseURL}/api/v1/friendship/${username}/follow/request`, {
			headers: {
				Authorization: `Bearer ${accessToken}`,
			},
		});

		return true;
	} catch (error) {
		const err = error as AxiosError<APIErrorResponseType>;

		if (err.response) {
			if (err.response.data.status !== 401) {
				return false;
			} else {
				alert(err.response.data.message);
			}
		} else {
			alert('Error occurred');
		}

		return false;
	}
};

// 내가 비공개일 때 나에게 팔로우 요청을 보냈는지 판단
export const getFollowRequestToMeStatus = async (
	followerUsername: string,
	accessToken: string
): Promise<boolean> => {
	try {
		await axios.get(
			`${baseURL}/api/v1/friendship/${followerUsername}/request`,
			{
				headers: {
					Authorization: `Bearer ${accessToken}`,
				},
			}
		);

		return true;
	} catch (error) {
		const err = error as AxiosError<APIErrorResponseType>;

		if (err.response) {
			if (
				err.response.data.status === 404 &&
				err.response.data.message === 'Request not found.'
			) {
				return false;
			} else {
				alert(err.response.data.message);
			}
		} else {
			alert('Error occurred');
		}

		return false;
	}
};

// 공개 유저를 팔로우
export const followPublicUser = async (
	username: string,
	accessToken: string
): Promise<boolean> => {
	try {
		await axios.post(
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

// 유저를 언팔로우
export const unfollowUser = async (
	username: string,
	accessToken: string
): Promise<boolean> => {
	try {
		await axios.delete(`${baseURL}/api/v1/friendship/${username}/follow`, {
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

// 비공개 유저에게 팔로우 요청 보내기
export const requestFollowToPrivateUser = async (
	username: string,
	accessToken: string
): Promise<boolean> => {
	try {
		await axios.post(
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

// 비공개 유저에게 보낸 팔로우 요청 취소
export const cancelRequestFollowToPrivateUser = async (
	username: string,
	accessToken: string
): Promise<boolean> => {
	try {
		await axios.delete(
			`${baseURL}/api/v1/friendship/${username}/follow/request`,
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

// 팔로우 요청 수락
export const acceptFollowRequest = async (
	followerUsername: string,
	accessToken: string
): Promise<boolean> => {
	try {
		await axios.post(
			`${baseURL}/api/v1/friendship/${followerUsername}/request`,
			{
				message: 'Accept follow request.',
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

// 팔로우 요청 거절
export const rejectFollowRequest = async (
	followerUsername: string,
	accessToken: string
): Promise<boolean> => {
	try {
		await axios.delete(
			`${baseURL}/api/v1/friendship/${followerUsername}/request`,
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

// 팔로워 삭제
export const deleteFollower = async (
	followerUsername: string,
	accessToken: string
): Promise<boolean> => {
	try {
		await axios.delete(
			`${baseURL}/api/v1/friendship/${followerUsername}/follower`,
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

// ****************************************************** 목록 가져오기 ******************************************************
// ****************************************************** 목록 가져오기 ******************************************************
// ****************************************************** 목록 가져오기 ******************************************************
// 팔로워 중에서 내가 팔로우 하는 사람 목록 가져오기, 유저 본인의 팔로워도 이거로 가져옴
export const getFollowerCommon = async (
	username: string,
	accessToken: string
): Promise<MiniProfileWithIsRequestType[]> => {
	try {
		const response = await axios.get<FollowListResponseType>(
			`${baseURL}/api/v1/friendship/${username}/follower/common`,
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
			alert(err.response.data.message);
		} else {
			alert('Error occurred');
		}

		return [];
	}
};

// 팔로워 중에서 내가 팔로우 하지 않는 사람 목록 가져오기
export const getFollowerDiff = async (
	username: string,
	accessToken: string
): Promise<MiniProfileWithIsRequestType[]> => {
	try {
		const response = await axios.get<FollowListResponseType>(
			`${baseURL}/api/v1/friendship/${username}/follower/diff`,
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
			alert(err.response.data.message);
		} else {
			alert('Error occurred');
		}

		return [];
	}
};

// 팔로잉 중에서 내가 팔로우 하는 사람 목록 가져오기, 유저 본인의 팔로잉도 이거로 가져옴
export const getFollowingCommon = async (
	username: string,
	accessToken: string
): Promise<MiniProfileWithIsRequestType[]> => {
	try {
		const response = await axios.get<FollowListResponseType>(
			`${baseURL}/api/v1/friendship/${username}/following/common`,
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
			alert(err.response.data.message);
		} else {
			alert('Error occurred');
		}

		return [];
	}
};

// 팔로잉 중에서 내가 팔로우 하지 않는 사람 목록 가져오기
export const getFollowingDiff = async (
	username: string,
	accessToken: string
): Promise<MiniProfileWithIsRequestType[]> => {
	try {
		const response = await axios.get<FollowListResponseType>(
			`${baseURL}/api/v1/friendship/${username}/following/diff`,
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
			alert(err.response.data.message);
		} else {
			alert('Error occurred');
		}

		return [];
	}
};

export const getFollowRequestList = async (
	accessToken: string
): Promise<MiniProfileType[]> => {
	try {
		const response = await axios.get(
			`${baseURL}/api/v1/friendship/requestlist`,
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
			alert(err.response.data.message);
		} else {
			alert('Error occurred');
		}

		return [];
	}
};

// 피드 미리보기 가져오기
export const getFeedPreview = async (
	username: string,
	accessToken: string
): Promise<PreviewType[]> => {
	try {
		const response = await axios.get<PreviewType[]>(
			`${baseURL}/api/v1/account/${username}/feed/preview`,
			{
				headers: {
					Authorization: `Bearer ${accessToken}`,
				},
			}
		);

		return response.data;
	} catch {
		return [];
	}
};

// 저장된 게시물 미리보기 가져오기
export const getSavedPreview = async (
	accessToken: string
): Promise<PreviewType[]> => {
	try {
		const response = await axios.get<PreviewType[]>(
			`${baseURL}/api/v1/account/saved-feed/preview`,
			{
				headers: {
					Authorization: `Bearer ${accessToken}`,
				},
			}
		);

		return response.data;
	} catch {
		return [];
	}
};

// 유저 피드 가져오기
export const getUserFeed = async (
	username: string,
	accessToken: string
): Promise<PostType[] | null> => {
	try {
		const response = await axios.get<PostResponseType[]>(
			`${baseURL}/api/v1/account/${username}/feed`,
			{
				headers: {
					Authorization: `Bearer ${accessToken}`,
				},
			}
		);
		return formatPostReponse(response.data);
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

// 유저가 저장한 게시물 가져오기
export const getSavedFeed = async (
	accessToken: string
): Promise<PostType[] | null> => {
	try {
		const response = await axios.get<PostResponseType[]>(
			`${baseURL}/api/v1/account/saved-feed`,
			{
				headers: {
					Authorization: `Bearer ${accessToken}`,
				},
			}
		);
		return formatPostReponse(response.data);
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
