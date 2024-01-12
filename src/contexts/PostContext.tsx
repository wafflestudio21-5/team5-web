export type Post = {
	postId: number
	userId: number
	username: string
	content: string
	imageUrl: string
	createdAt: string
	likesCount: number
	commentsCount: number
}

export type Feed = {
	posts: Post[]
	page: number
	total: number
}
