import axios, { AxiosError } from 'axios';

import { baseURL } from '../constants';
import {
	APIErrorResponseType,
	CategoryType,
	CommentPageType,
	CommentType,
	FeedType,
	MediaType,
	MiniProfileType,
	PostType,
} from '../types.ts';

import { resetAccessToken } from './login';

type TryPostType = {
	content: string;
	files: FileList;
	category: CategoryType;
	accessToken: string;
};
// author(user) response 형
type AuthorResponseType = {
	id: number;
	profileImageUrl: string;
	username: string;
};

// 게시물 response 형
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
	hideLike: boolean;
	category: CategoryType;
};
// 피드 response 형
export type FeedResponseType = {
	posts: PostResponseType[];
	pageInfo: {
		page: number;
		size: number;
		offset: number;
		hasNext: boolean;
		elements: number;
	};
};

export const tryPost = async ({
	content,
	files,
	category,
	accessToken,
}: TryPostType) => {
	const api = axios.create({ baseURL: baseURL });
	const formData = new FormData();
	formData.append('content', content);
	formData.append('category', category.toString());
	for (let i = 0; i < files.length; i++) {
		const file = files[i];
		const blob = new Blob([file], { type: file.type });
		formData.append('files', blob);
	}
	try {
		const response = await axios.post(`${baseURL}/api/v1/posts`, formData, {
			headers: {
				Authorization: `Bearer ${accessToken}`,
				'Content-Type': 'multipart/form-data',
			},
		});
		console.log(response);
		return response;
	} catch (error) {
		const err = error as AxiosError<APIErrorResponseType>;

		if (err.response && err.response.status == 401) {
			try {
				const newAccessToken = await resetAccessToken();
				const retryResponse = await api.post(
					`${baseURL}/api/v1/posts`,
					formData,
					{
						headers: {
							Authorization: `Bearer ${newAccessToken}`,
							'Content-Type': 'multipart/form-data',
						},
					}
				);
				console.log(retryResponse);
				return retryResponse;
			} catch (refreshError) {
				console.error('토큰 재발급 실패 : ', refreshError);
				return null;
			}
		} else if (err.response && err.response.data) {
			alert(err.response.data);
		} else {
			alert('Error occurred');
		}

		return null;
	}
};

// 피드 게시물 가져오기
export const getFeedData = async (
	page: number,
	accessToken: string,
	postId?: number
): Promise<FeedType | null> => {
	try {
		if (postId === undefined) {
			const response = await axios.get<FeedResponseType>(
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
					hideLike: post.hideLike,
					category: post.category,
				};
			});

			const feed: FeedType = {
				posts: posts,
				pageInfo: result.pageInfo,
			};

			return feed;
		} else {
			const response = await axios.get<FeedResponseType>(
				`${baseURL}/api/v1/feed/${postId}?page=${page}`,
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
		}
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

type CommentResponseType = {
	id: number;
	text: string;
	createdAt: string;
	postId: number;
	replyCount: number;
	likeCount: number;
	liked: boolean;
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
				profileImageUrl: comment.userProfileImageUrl ?? '',
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
				liked: comment.liked,
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
			alert(err.response.data.message);
		} else {
			alert('Error occurred');
		}

		return null;
	}
};

type ReplyResponseType = {
	id: number;
	content: string;
	createdAt: string;
	postId: number;
	replyCount: number;
	likeCount: number;
	liked: boolean;
	userId: number;
	userProfileImageUrl: string;
	username: string;
};

type RepliesResponseType = {
	content: ReplyResponseType[];
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

// 답글 가져오기
export const getReply = async (
	commentId: number,
	page: number,
	accessToken: string
): Promise<CommentPageType | null> => {
	try {
		const response = await axios.get<RepliesResponseType>(
			`${baseURL}/api/v1/comments/${commentId}/replies?page=${page}`,
			{
				headers: {
					Authorization: `Bearer ${accessToken}`,
				},
			}
		);
		const result = response.data;
		const replies: CommentType[] = result.content.map((comment) => {
			const user: MiniProfileType = {
				userId: comment.userId,
				username: comment.username,
				profileImageUrl: comment.userProfileImageUrl ?? '',
				name: '',
			};
			return {
				id: comment.id,
				text: comment.content,
				createdAt: comment.createdAt,
				user: user,
				postId: comment.postId,
				replyCount: comment.replyCount,
				likeCount: comment.likeCount,
				liked: comment.liked,
			};
		});

		return {
			content: replies,
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
			alert(err.response.data.message);
		} else {
			alert('Error occurred');
		}

		return null;
	}
};

type SuccessFailResponse = {
	status: 'success' | 'failed';
};

// 좋아요 버튼 눌렀을 때 처리
export const handleLike = async (
	postId: number,
	isLiked: boolean,
	accessToken: string
): Promise<SuccessFailResponse | null> => {
	try {
		if (isLiked) {
			await axios.delete(`${baseURL}/api/v1/posts/${postId}/likes`, {
				headers: {
					Authorization: `Bearer ${accessToken}`,
				},
			});
		} else {
			await axios.post(
				`${baseURL}/api/v1/posts/${postId}/likes`,
				{},
				{
					headers: {
						Authorization: `Bearer ${accessToken}`,
					},
				}
			);
		}

		return { status: 'success' };
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

// 저장 버튼 눌렀을 때 처리
export const handleSave = async (
	postId: number,
	isSaved: boolean,
	accessToken: string
): Promise<SuccessFailResponse | null> => {
	try {
		if (isSaved) {
			await axios.delete(`${baseURL}/api/v1/posts/${postId}/save`, {
				headers: {
					Authorization: `Bearer ${accessToken}`,
				},
			});
		} else {
			await axios.post(
				`${baseURL}/api/v1/posts/${postId}/save`,
				{},
				{
					headers: {
						Authorization: `Bearer ${accessToken}`,
					},
				}
			);
		}

		return { status: 'success' };
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

// 댓글 달기
export const postComment = async (
	postId: number,
	content: string,
	accessToken: string
): Promise<SuccessFailResponse | null> => {
	try {
		await axios.post(
			`${baseURL}/api/v1/posts/${postId}/comments`,
			{
				content: content,
			},
			{
				headers: {
					Authorization: `Bearer ${accessToken}`,
				},
			}
		);

		return {
			status: 'success',
		};
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

// 답글 달기
export const postReply = async (
	commentId: number,
	content: string,
	accessToken: string
): Promise<SuccessFailResponse | null> => {
	try {
		await axios.post(
			`${baseURL}/api/v1/comments/${commentId}/replies`,
			{
				content: content,
			},
			{
				headers: {
					Authorization: `Bearer ${accessToken}`,
					'Content-Type': 'application/json',
				},
			}
		);

		return {
			status: 'success',
		};
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

// 댓글 좋아요 버튼 처리
export const handleCommentLike = async (
	commentId: number,
	isLiked: boolean,
	accessToken: string
): Promise<SuccessFailResponse | null> => {
	try {
		if (isLiked) {
			await axios.delete(`${baseURL}/api/v1/comments/${commentId}/likes`, {
				headers: {
					Authorization: `Bearer ${accessToken}`,
				},
			});
		} else {
			await axios.post(
				`${baseURL}/api/v1/comments/${commentId}/likes`,
				{},
				{
					headers: {
						Authorization: `Bearer ${accessToken}`,
					},
				}
			);
		}

		return { status: 'success' };
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

// 댓글 좋아요 버튼 처리
export const handleReplyLike = async (
	replyId: number,
	isLiked: boolean,
	accessToken: string
): Promise<SuccessFailResponse | null> => {
	try {
		if (isLiked) {
			await axios.delete(`${baseURL}/api/v1/replies/${replyId}/likes`, {
				headers: {
					Authorization: `Bearer ${accessToken}`,
				},
			});
		} else {
			await axios.post(
				`${baseURL}/api/v1/replies/${replyId}/likes`,
				{},
				{
					headers: {
						Authorization: `Bearer ${accessToken}`,
					},
				}
			);
		}

		return { status: 'success' };
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

// 댓글 삭제
export const deleteComment = async (
	commentId: number,
	accessToken: string
): Promise<SuccessFailResponse | null> => {
	try {
		await axios.delete(`${baseURL}/api/v1/comments/${commentId}`, {
			headers: {
				Authorization: `Bearer ${accessToken}`,
			},
		});

		return { status: 'success' };
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

// 답글 삭제
export const deleteReply = async (
	replyId: number,
	accessToken: string
): Promise<SuccessFailResponse | null> => {
	try {
		await axios.delete(`${baseURL}/api/v1/replies/${replyId}`, {
			headers: {
				Authorization: `Bearer ${accessToken}`,
			},
		});

		return { status: 'success' };
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

export const deletePost = async (
	postId: number,
	accessToken: string
): Promise<SuccessFailResponse | null> => {
	try {
		await axios.delete(`${baseURL}/api/v1/posts/${postId}}`, {
			headers: {
				Authorization: `Bearer ${accessToken}`,
			},
		});

		return { status: 'success' };
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

export const editPost = async (
	postId: number,
	content: string,
	accessToken: string
): Promise<SuccessFailResponse | null> => {
	try {
		await axios.put(
			`${baseURL}/api/v1/posts/${postId}}`,
			{ content: content },
			{
				headers: {
					Authorization: `Bearer ${accessToken}`,
					'Content-Type': 'appication/json',
				},
			}
		);

		return { status: 'success' };
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
