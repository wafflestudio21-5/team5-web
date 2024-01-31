import axios, { AxiosError } from 'axios';

import { baseURL } from '../constants';
import {
	APIErrorResponseType,
	CategoryType,
	ExplorePreviewType,
} from '../types';

// 카테고리 대소문자 mapping
export const CategoryMap: { [key in string]: CategoryType } = {
	game: 'GAME',
	food: 'FOOD',
	sport: 'SPORT',
	animal: 'ANIMAL',
	life: 'LIFE',
	fashion: 'FASHION',
	humor: 'HUMOR',
	art: 'ART',
	news: 'NEWS',
};
// 탐색탭 preview 가져오기
export const getCategoryExplore = async (
	category: CategoryType,
	page: number,
	accessToken: string
): Promise<ExplorePreviewType | null> => {
	try {
		const response = await axios.get<ExplorePreviewType>(
			`${baseURL}/api/v1/explore?page=${page}&category=${category}&sort=RANDOM`,
			{
				headers: {
					Authorization: `Bearer ${accessToken}`,
					'Content-Type': 'application/json',
				},
			}
		);

		const result = response.data;

		return result;
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
