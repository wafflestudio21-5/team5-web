import axios, { AxiosError } from 'axios';

import { baseURL } from '../constants.ts';
import {
	APIErrorResponseType,
	MiniProfileType,
	RecentSearchType,
} from '../types.ts';

// 유저 5명 검색
export const getSearchPreview = async (
	accessToken: string,
	searchText: string
): Promise<MiniProfileType[]> => {
	try {
		const response = await axios.get<MiniProfileType[]>(
			`${baseURL}/api/v1/search/preview`,
			{
				params: {
					text: searchText,
				},
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

type SearchAllResponseType = {
	miniProfiles: MiniProfileType[];
	pageInfo: {
		page: number;
		size: number;
		offset: number;
		hasNext: boolean;
		elements: number;
	};
};

// 유저 전체 검색
export const getSearchAll = async (
	accessToken: string,
	searchText: string,
	page: number = 1,
	size: number = 20
): Promise<SearchAllResponseType | null> => {
	try {
		const response = await axios.get<SearchAllResponseType>(
			`${baseURL}/api/v1/search/all`,
			{
				params: {
					text: searchText,
					page: page,
					size: size,
				},
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

		return null;
	}
};

// 최근 검색 기록에 text 추가
export const addTextToRecentSearch = async (
	accessToken: string,
	searchText: string
): Promise<boolean> => {
	try {
		await axios.post(
			`${baseURL}/api/v1/search/recent/text`,
			{
				text: searchText,
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

// 최근 검색 기록에 user 추가
export const addUserToRecentSearch = async (
	accessToken: string,
	userId: number,
	username: string
): Promise<boolean> => {
	try {
		await axios.post(
			`${baseURL}/api/v1/search/recent/user`,
			{
				userId: userId,
				username: username,
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

// 최근 검색 기록 가져오기
export const getRecentSearchList = async (
	accessToken: string
): Promise<RecentSearchType[]> => {
	try {
		const response = await axios.get<RecentSearchType[]>(
			`${baseURL}/api/v1/search/recent`,
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

// 최근 검색 기록 1개 삭제
export const deleteRecentSearch = async (
	accessToken: string,
	searchId: number
): Promise<boolean> => {
	try {
		await axios.delete(`${baseURL}/api/v1/search/recent/${searchId}`, {
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

// 최근 검색 기록 전체 삭제
export const deleteAllRecentSearch = async (
	accessToken: string
): Promise<boolean> => {
	try {
		await axios.delete(`${baseURL}/api/v1/search/recent/all`, {
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
