// 모든 변수는 CamelCase로 작성한다.
// 모든 타입은 뒤에 Type을 붙여준다.

type UserLink = {
	linkId: number;
	links: string; // Assuming 'links' is a URL string
};

type UserContact = {
	contactType: string; // e.g., "EMAIL"
	contactValue: string; // e.g., an email address
	isConfirmed: number; // 0 or 1, assuming this is a boolean-like field
};

export type UserType = {
	userId: number;
	username: string;
	name: string;
	password: string; // Note: Storing passwords like this is generally unsafe
	birthday: string; // or Date if you're going to convert it
	isPrivate: number; // 0 or 1, assuming this is a boolean-like field
	pronoun: string;
	profileImageUrl: string;
	bio: string;
	userLinks: UserLink[];
	contacts: UserContact[];
	followingNumber: number;
	followerNumber: number;
};

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
