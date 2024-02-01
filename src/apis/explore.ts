import axios, { AxiosError } from 'axios';

import { baseURL } from '../constants';
import {
	APIErrorResponseType,
	CategoryType,
	ExplorePreviewType,
	FeedType,
	MiniProfileType,
	PostType,
	PreviewType,
} from '../types';

import { FeedResponseType } from './post';

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

type ExplorePreviewReponseType = {
	postId: number;
	thumbnailUrl: string;
};

type CategoryResponseType = {
	previews: ExplorePreviewReponseType[];
	pageInfo: ExplorePreviewType['pageInfo'];
};

// Detail 탐색탭 preview 가져오기
export const getCategoryExplore = async (
	category: CategoryType,
	page: number,
	accessToken: string
): Promise<ExplorePreviewType | null> => {
	try {
		const response = await axios.get<CategoryResponseType>(
			`${baseURL}/api/v1/explore?page=${page}&category=${category}&size=24`,
			{
				headers: {
					Authorization: `Bearer ${accessToken}`,
					'Content-Type': 'application/json',
				},
			}
		);

		const result = response.data;

		const formatedPreviews = result.previews.map((preview) => {
			const formated: PreviewType = {
				id: preview.postId,
				thumbnailUrl: preview.thumbnailUrl,
			};
			return formated;
		});

		return { previews: formatedPreviews, pageInfo: result.pageInfo };
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

// Compact 탐색탭 미리보기 가져오기
export const getCompactExplore = async (
	category: CategoryType,
	accessToken: string
): Promise<PreviewType[] | null> => {
	try {
		const response = await axios.get<CategoryResponseType>(
			`${baseURL}/api/v1/explore?size=6&category=${category}&page=0`,
			{
				headers: {
					Authorization: `Bearer ${accessToken}`,
					'Content-Type': 'application/json',
				},
			}
		);

		const result = response.data;

		const formatedPreviews = result.previews.map((preview) => {
			const formated: PreviewType = {
				id: preview.postId,
				thumbnailUrl: preview.thumbnailUrl,
			};
			return formated;
		});

		return formatedPreviews;
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

export const getExploreFeed = async (
	postId: number,
	page: number,
	accessToken: string
): Promise<FeedType | null> => {
	try {
		const response = await axios.get<FeedResponseType>(
			`${baseURL}/api/v1/explore/${postId}?page=${page}`,
			{
				headers: {
					Authorization: `Bearer ${accessToken}`,
				},
			}
		);

		const result = response.data;

		const posts: PostType[] = result.posts.map((post) => {
			const user: MiniProfileType = {
				userId: post.author.id,
				profileImageUrl: post.author.profileImageUrl,
				username: post.author.username,
				name: '',
			};
			return {
				id: post.id,
				content: post.content,
				media: post.media,
				createdAt: post.createdAt,
				likeCount: post.likeCount,
				commentCount: post.commentCount,
				user: user,
				liked: post.liked,
				saved: post.saved,
				hideLike: post.hideLike,
				category: post.category,
			};
		});

		const feed: FeedType = {
			posts: posts,
			pageInfo: result.pageInfo,
		};

		return feed;
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
