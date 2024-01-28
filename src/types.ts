// 모든 변수는 CamelCase로 작성한다.
// export되는 모든 타입 이름은 끝에 Type을 붙여준다.

// api
import { ReactNode } from 'react';

export type APIErrorResponseType = {
	status: number;
	code: string;
	message: string;
};

// context
export type ProviderPropsType = {
	children: ReactNode;
};

// User
export type UserLinkType = {
	linkId: number;
	linkTitle: string;
	link: string;
};

export type UserContactType = {
	contactType: string;
	contactValue: string;
	isConfirmed: boolean;
};

export type UserType = {
	userId: number;
	username: string;
	name: string;
	birthday: Date;
	isPrivate: boolean;
	gender: string;
	isCustomGender: boolean;
	profileImageUrl: string;
	bio: string;
	userLinks: UserLinkType[];
	contacts: UserContactType[];
	postNumber: number;
	followingNumber: number;
	followerNumber: number;
};

export type MiniProfileType = {
	userId: number;
	username: string;
	name: string;
	profileImageUrl: string;
};

// Post
export type PostType = {
	id: number;
	user: UserType;
	content: string;
	imageUrl: string;
	createdAt: string;
	likesCount: number;
	commentsCount: number;
};

export type FeedType = {
	posts: PostType[];
	page: number;
};

export type CommentType = {
	id: number;
	user: UserType;
	content: string;
	createdAt: string;
};
