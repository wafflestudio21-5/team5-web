import { useEffect, useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';
import styled from 'styled-components';

import { deletePost } from '../apis/post.ts';
import { useUserContext } from '../contexts/UserContext.tsx';
import { getColor } from '../styles/Theme.tsx';
import { PostType } from '../types.ts';

import CommentModal from './Comment/CommentModal.tsx';
import Post from './Post/Post.tsx';
import PostMenuModal from './Post/PostMenuModal.tsx';

const Container = styled.div`
	background-color: ${getColor('white')};
	width: 100%;
	display: flex;
	flex-direction: column;
	justify-content: center;
`;

type ModalState = 'open' | 'closed' | 'closing';

export default function Feed({ posts }: { posts: PostType[] }) {
	const [menuModal, setMenuModal] = useState<ModalState>('closed');
	const [commentModal, setCommentModal] = useState<ModalState>('closed');

	const [menuPost, setMenuPost] = useState<PostType | null>(null);
	const [commentPost, setCommentPost] = useState<PostType | null>(null);

	const openMenuModal = (post: PostType) => {
		setMenuPost(post);
		setMenuModal('open');
	};

	const openCommentModal = (post: PostType) => {
		setCommentPost(post);
		setCommentModal('open');
	};

	const { accessToken } = useUserContext();

	const [deletedPost, setDeletedPost] = useState<number[]>([]);

	const focus = useRef<HTMLDivElement | null>(null);
	const hash = useLocation().hash;

	const [isFocuesd, setIsFocused] = useState(false);

	const handleDeletePost = async (postId: number) => {
		const result = await deletePost(postId, accessToken);
		if (result?.status === 'success') {
			setDeletedPost([...deletedPost, postId]);
		}
	};

	// eslint-disable-next-line react-hooks/exhaustive-deps
	useEffect(() => {
		if (focus.current && !isFocuesd) {
			focus.current?.scrollIntoView({ behavior: 'instant' });
			setIsFocused(true);
		}
	});

	return (
		<>
			<Container>
				{posts
					.filter((post) => deletedPost.indexOf(post.id) <= -1)
					.map((post) => (
						<div ref={hash === `#post${post.id}` ? focus : null}>
							<Post
								postData={post}
								openMenuModal={openMenuModal}
								openCommentModal={openCommentModal}
							/>
						</div>
					))}
			</Container>
			{menuModal !== 'closed' && (
				<PostMenuModal
					close={() => {
						setMenuModal('closing');
						setTimeout(() => {
							setMenuModal('closed');
							setMenuPost(null);
						}, 300);
					}}
					isClosing={menuModal === 'closing'}
					post={menuPost}
					handleDeletePost={handleDeletePost}
				/>
			)}
			{commentModal !== 'closed' && (
				<CommentModal
					post={commentPost}
					isClosing={commentModal === 'closing'}
					close={() => {
						setCommentModal('closing');
						setTimeout(() => {
							setCommentModal('closed');
							setCommentPost(null);
						}, 300);
					}}
				/>
			)}
		</>
	);
}
