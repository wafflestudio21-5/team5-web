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
	comment_id: number;
	user_id: number;
	username: string;
	content: string;
	created_at: string;
};

type PostCommentResponseType = {
	comments: CommentResponseType[];
	page: number;
	limit: number;
	total: number;
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
		const comments: CommentType[] = result.comments.map((comment) => {
			return {
				id: comment.comment_id,
				content: comment.content,
				createdAt: comment.created_at,
				user: {
					userId: comment.user_id,
					username: comment.username,
					profileImageUrl:
						'https://wafflestudio.com/static/images/DefaultProfileImage.svg', // TODO: 유저의 프로필 이미지로 바꾸기
					name: '홍길동', // TODO: 유저의 실제 이름을 받기
					isPrivate: true, // TODO
				},
			};
		});

		return {
			comments: comments,
			page: result.page,
			limit: result.limit,
			total: result.total,
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
