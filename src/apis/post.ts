import axios, { AxiosError } from 'axios';

import { baseURL } from '../constants.ts';
import { CommentType, FeedType, PostType } from '../types.ts';

type APIErrorResponseType = {
	error: string;
};

type PostResponseType = {
	post_id: number;
	user_id: number;
	username: string;
	content: string;
	image_url: string;
	created_at: string;
	likes_count: number;
	comments_count: number;
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
export const getHomeFeed = async (page: number): Promise<FeedType | null> => {
	try {
		const response = await axios.get<HomeFeedResponseType>(
			`${baseURL}/api/v1/feed/timeline?page=${page}`
		);
		const result = response.data;

		const posts: PostType[] = result.posts.map((post) => {
			return {
				id: post.post_id,
				content: post.content,
				imageUrl: post.image_url,
				createdAt: post.created_at,
				likesCount: post.likes_count,
				commentsCount: post.comments_count,
				user: {
					id: post.user_id,
					username: post.username,
					profileImageUrl:
						'https://wafflestudio.com/static/images/DefaultProfileImage.svg', // TODO: 유저의 프로필 이미지로 바꾸기
					name: '홍길동', // TODO: 유저의 실제 이름을 받기
					isPrivate: true, // TODO
				},
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
	page: number
): Promise<CommentType[] | null> => {
	try {
		const response = await axios.get<PostCommentResponseType>(
			`${baseURL}/api/v1/posts/${postId}/comments?page=${page}`
		);
		const result = response.data;
		const comments: CommentType[] = result.comments.map((comment) => {
			return {
				id: comment.comment_id,
				content: comment.content,
				createdAt: comment.created_at,
				user: {
					id: comment.user_id,
					username: comment.username,
					profileImageUrl:
						'https://wafflestudio.com/static/images/DefaultProfileImage.svg', // TODO: 유저의 프로필 이미지로 바꾸기
					name: '홍길동', // TODO: 유저의 실제 이름을 받기
					isPrivate: true, // TODO
				},
			};
		});

		return comments;
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
