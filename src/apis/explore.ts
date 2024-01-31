import axios, { AxiosError } from 'axios';

import { baseURL } from '../constants';
import {
	APIErrorResponseType,
	CategoryType,
	ExplorePreviewType,
	PreviewType,
} from '../types';

// 카테고리 대소문자 mapping
export const CategoryMap: { [key in string]: CategoryType } = {
	game: 'GAME',
	travel: 'TRAVEL',
	food: 'FOOD',
	sport: 'SPORT',
	animal: 'ANIMAL',
	life: 'LIFE',
	fashion: 'FASHION',
	humor: 'HUMOR',
	art: 'ART',
	news: 'NEWS',
};

export const KorCategoryMap: { [key in string]: CategoryType } = {
	게임: 'GAME',
	여행: 'TRAVEL',
	음식: 'FOOD',
	스포츠: 'SPORT',
	동물: 'ANIMAL',
	일상: 'LIFE',
	패션: 'FASHION',
	유머: 'HUMOR',
	예술: 'ART',
	뉴스: 'NEWS',
};

type CategoryResponseType = {
	postMediasBriefList: PreviewType[];
	pageInfo: ExplorePreviewType['pageInfo'];
};

// 탐색탭 preview 가져오기
export const getCategoryExplore = async (
	category: CategoryType,
	page: number,
	accessToken: string
): Promise<ExplorePreviewType | null> => {
	try {
		const response = await axios.get<CategoryResponseType>(
			`${baseURL}/api/v1/explore?page=${page}&category=${category}&sort=RANDOM`,
			{
				headers: {
					Authorization: `Bearer ${accessToken}`,
					'Content-Type': 'application/json',
				},
			}
		);

		const result = response.data;

		return { previews: result.postMediasBriefList, pageInfo: result.pageInfo };
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

// 탐색탭 미리보기 가져오기
export const getCompactExplore = async (
	category: CategoryType,
	accessToken: string
): Promise<PreviewType[] | null> => {
	try {
		const response = await axios.get<CategoryResponseType>(
			`${baseURL}/api/v1/explore?size=6&category=${category}&sort=RANDOM`,
			{
				headers: {
					Authorization: `Bearer ${accessToken}`,
					'Content-Type': 'application/json',
				},
			}
		);

		const result = response.data;

		return result.postMediasBriefList;
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
