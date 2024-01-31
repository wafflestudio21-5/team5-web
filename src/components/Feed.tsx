import { useEffect, useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';
import styled from 'styled-components';

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

	const [menuPostId, setMenuPostId] = useState<number | null>(null);
	const [commentPost, setCommentPost] = useState<PostType | null>(null);

	const openMenuModal = (postId: number) => {
		setMenuPostId(postId);
		setMenuModal('open');
	};

	const openCommentModal = (post: PostType) => {
		setCommentPost(post);
		setCommentModal('open');
	};

	const focus = useRef<HTMLDivElement | null>(null);
	const hash = useLocation().hash;

	const [isFocuesd, setIsFocused] = useState(false);

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
				{posts.map((post) => (
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
							setMenuPostId(null);
						}, 300);
					}}
					isClosing={menuModal === 'closing'}
					postId={menuPostId}
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
