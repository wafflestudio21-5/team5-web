import axios, { AxiosError } from 'axios';

import { baseURL } from '../constants.ts';
import {
	APIErrorResponseType,
	CommentPageType,
	CommentType,
	FeedType,
	MediaType,
	MiniProfileType,
	PostType,
} from '../types.ts';

type AuthorResponseType = {
	id: number;
	profileImageUrl: string;
	username: string;
};

type PostResponseType = {
	id: number;
	author: AuthorResponseType;
	content: string;
	media: MediaType[];
	createdAt: string;
	likeCount: number;
	commentCount: number;
	liked: boolean;
	saved: boolean;
};

type HomeFeedResponseType = {
	posts: PostResponseType[];
	pageInfo: {
		page: number;
		size: number;
		offset: number;
		hasNext: boolean;
		elements: number;
	};
};

// 홈 피드 게시물 가져오기
export const getHomeFeed = async (
	page: number,
	accessToken: string
): Promise<FeedType | null> => {
	try {
		const response = await axios.get<HomeFeedResponseType>(
			`${baseURL}/api/v1/feed/timeline?page=${page}`,
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
			alert(err.response.data.error);
		} else {
			alert('Error occurred');
		}

		return null;
	}
};

type CommentResponseType = {
	id: number;
	text: string;
	createdAt: string;
	postId: number;
	replyCount: number;
	likeCount: number;
	userId: number;
	userProfileImageUrl: string;
	username: string;
};

type PostCommentResponseType = {
	content: CommentResponseType[];
	pageable: CommentPageType['pageable'];
	sort: CommentPageType['sort'];
	empty: false;
	first: true;
	last: true;
	number: number;
	numberOfElements: number;
	totalElements: number;
	totalPages: number;
};

// 게시물 댓글 가져오기
export const getPostComment = async (
	postId: number,
	page: number,
	accessToken: string
): Promise<CommentPageType | null> => {
	try {
		const response = await axios.get<PostCommentResponseType>(
			`${baseURL}/api/v1/posts/${postId}/comments?page=${page}`,
			{
				headers: {
					Authorization: `Bearer ${accessToken}`,
				},
			}
		);
		const result = response.data;
		const comments: CommentType[] = result.content.map((comment) => {
			const user: MiniProfileType = {
				userId: comment.userId,
				username: comment.username,
				profileImageUrl: comment.userProfileImageUrl,
				name: '',
			};
			return {
				id: comment.id,
				text: comment.text,
				createdAt: comment.createdAt,
				user: user,
				postId: comment.postId,
				replyCount: comment.replyCount,
				likeCount: comment.likeCount,
			};
		});

		return {
			content: comments,
			pageable: result.pageable,
			sort: result.sort,
			empty: result.empty,
			first: result.first,
			last: result.last,
			number: result.number,
			numberOfElements: result.numberOfElements,
			totalElements: result.totalElements,
			totalPages: result.totalPages,
		};
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

type HandleLikeResponseType = {
	status: 'success' | 'failed';
};

// 좋아요 버튼 눌렀을 때 처리
export const handleLike = async (
	postId: number,
	isLiked: boolean,
	accessToken: string
): Promise<HandleLikeResponseType | null> => {
	try {
		if (isLiked) {
			await axios.delete(`${baseURL}/api/v1/posts/${postId}/likes`, {
				headers: {
					Authorization: `Bearer ${accessToken}`,
				},
			});
		} else {
			await axios.post(`${baseURL}/api/v1/posts/${postId}/likes`, {
				headers: {
					Authorization: `Bearer ${accessToken}`,
				},
			});
		}

		return { status: 'success' };
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

type HandleSaveResponseType = {
	status: 'success' | 'failed';
};

// 저장 버튼 눌렀을 때 처리
export const handleSave = async (
	postId: number,
	isSaved: boolean,
	accessToken: string
): Promise<HandleSaveResponseType | null> => {
	try {
		if (isSaved) {
			await axios.delete(`${baseURL}/api/v1/posts/${postId}/save`, {
				headers: {
					Authorization: `Bearer ${accessToken}`,
				},
			});
		} else {
			await axios.post(`${baseURL}/api/v1/posts/${postId}/save`, {
				headers: {
					Authorization: `Bearer ${accessToken}`,
				},
			});
		}

		return { status: 'success' };
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
