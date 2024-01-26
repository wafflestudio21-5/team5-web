import { useState } from 'react';
import styled from 'styled-components';

import { getColor } from '../styles/Theme.tsx';
// import feed from '../test/data/feed.json';
import { PostType } from '../types.ts';

import CommentModal from './Comment/CommentModal.tsx';
// import Post from './Post/Post.tsx';
import PostMenuModal from './Post/PostMenuModal.tsx';

const Container = styled.div`
	background-color: ${getColor('white')};
	width: 100%;
	display: flex;
	flex-direction: column;
	justify-content: center;
`;

type ModalState = 'open' | 'closed' | 'closing';

export default function Feed() {
	const [menuModal, setMenuModal] = useState<ModalState>('closed');
	const [commentModal, setCommentModal] = useState<ModalState>('closed');

	const [menuPostId, setMenuPostId] = useState<number | null>(null);
	const [commentPost, setCommentPost] = useState<PostType | null>(null);

	// const openMenuModal = (postId: number) => {
	// 	setMenuPostId(postId);
	// 	setMenuModal('open');
	// };
	//
	// const openCommentModal = (post: PostType) => {
	// 	setCommentPost(post);
	// 	console.log('?');
	// 	setCommentModal('open');
	// };

	return (
		<>
			<Container>
				{/*{feed.posts.map((post) => (*/}
				{/*	<Post*/}
				{/*		postData={post}*/}
				{/*		openMenuModal={openMenuModal}*/}
				{/*		openCommentModal={openCommentModal}*/}
				{/*	/>*/}
				{/*))}*/}
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
