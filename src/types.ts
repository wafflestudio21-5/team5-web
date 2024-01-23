// 모든 변수는 CamelCase로 작성한다.
// export되는 모든 타입 이름은 끝에 Type을 붙여준다.

// api
export type APIErrorResponseType = {
	error: string;
};

// User
export type UserLinkType = {
	linkId: number;
	linkTitle: string;
	links: string;
};

export type UserContactType = {
	contactType: string; // e.g., "EMAIL"
	contactValue: string; // e.g., an email address
	isConfirmed: number; // 0 or 1, assuming this is a boolean-like field
};

export type UserType = {
	userId: number;
	username: string;
	name: string;
	password: string;
	birthday: string;
	isPrivate: boolean;
	pronoun: string;
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
	postId: number;
	userId: number;
	username: string;
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
