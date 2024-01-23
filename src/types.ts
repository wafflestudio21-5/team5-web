// 모든 변수는 CamelCase로 작성한다.
// 모든 타입은 뒤에 Type을 붙여준다.

export type UserType = {
	id: number;
	name: string;
	username: string;
	profileImageUrl: string;
	isPrivate: boolean;
};

export type PostType = {
	postId: number;
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
	total: number;
};

export type CommentType = {
	commentId: number;
	user: UserType;
	content: string;
	createdAt: string;
};
