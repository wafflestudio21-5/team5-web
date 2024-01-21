export type PostDataType = {
	postId: number;
	userId: number;
	username: string;
	content: string;
	imageUrl: string;
	createdAt: string;
	likesCount: number;
	commentsCount: number;
};

export type FeedDataType = {
	posts: PostDataType[];
	page: number;
	total: number;
};
