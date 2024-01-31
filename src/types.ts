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
	user: MiniProfileType;
	content: string;
	media: MediaType[];
	createdAt: string;
	likeCount: number;
	liked: boolean;
	commentCount: number;
	saved: boolean;
	hideLike: boolean;
	category: CategoryType;
};

export type FeedType = {
	posts: PostType[];
	pageInfo: {
		page: number;
		size: number;
		offset: number;
		hasNext: boolean;
		elements: number;
	};
};

export type CommentType = {
	id: number;
	user: MiniProfileType;
	text: string;
	createdAt: string;
	postId: number;
	replyCount: number;
	likeCount: number;
	liked: boolean;
};

export type CommentPageType = {
	content: CommentType[];
	empty: false;
	first: true;
	last: true;
	number: number;
	numberOfElements: number;
	pageable: {
		offset: number;
		pageNumber: number;
		pageSize: number;
		paged: boolean;
		sort: SortType;
		size: number;
	};
	sort: SortType;
	totalElements: number;
	totalPages: number;
};

export type SortType = {
	empty: boolean;
	sorted: boolean;
	unsorted: boolean;
};

export type MediaType = {
	id: number;
	mediaType: string;
	order: number;
	postId: number;
	url: string;
};

export type PreviewType = {
	id: number;
	thumbnailUrl: string;
};

export type CategoryType =
	| 'GAME'
	| 'TRAVEL'
	| 'FOOD'
	| 'SPORT'
	| 'ANIMAL'
	| 'LIFE'
	| 'FASHION'
	| 'HUMOR'
	| 'ART'
	| 'NEWS';

export type ExplorePreviewType = {
	previews: PreviewType[];
	pageInfo: {
		page: number;
		size: number;
		offset: number;
		hasNext: boolean;
		elements: number;
	};
};
