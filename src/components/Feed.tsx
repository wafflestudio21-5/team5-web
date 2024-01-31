import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
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

	const navigate = useNavigate();

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

				{/* test */}
				<div>
					<h1>test</h1>
					<button onClick={() => navigate('/user-0')}>user-0</button>
					<button onClick={() => navigate('/user-1')}>user-1</button>
					<button onClick={() => navigate('/user-2')}>user-2</button>
					<button onClick={() => navigate('/user-3')}>user-3</button>
					<button onClick={() => navigate('/user-4')}>user-4</button>
					<button onClick={() => navigate('/user-5')}>user-5</button>
					<button onClick={() => navigate('/user-6')}>user-6</button>
					<button onClick={() => navigate('/user-7')}>user-7</button>
					<button onClick={() => navigate('/user-8')}>user-8</button>
					<button onClick={() => navigate('/user-9')}>user-9</button>
					<button onClick={() => navigate('/user-10')}>user-10</button>
					<button onClick={() => navigate('/user-11')}>user-11</button>
					<button onClick={() => navigate('/user-12')}>user-12</button>
					<button onClick={() => navigate('/user-13')}>user-13</button>
					<button onClick={() => navigate('/user-14')}>user-14</button>
					<button onClick={() => navigate('/user-15')}>user-15</button>
					<button onClick={() => navigate('/user-16')}>user-16</button>
					<button onClick={() => navigate('/user-17')}>user-17</button>
					<button onClick={() => navigate('/user-18')}>user-18</button>
					<button onClick={() => navigate('/user-19')}>user-19</button>
					<button onClick={() => navigate('/user-20')}>user-20</button>
				</div>
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
