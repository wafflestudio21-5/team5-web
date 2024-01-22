import { useState } from 'react';
import styled from 'styled-components';

import { FeedType } from '../types.ts';

import Post from './Post/Post.tsx';
import PostMenuModal from './Post/PostMenuModal.tsx';

const Container = styled.div`
	background-color: white;
	width: 100%;
	display: flex;
	flex-direction: column;
	justify-content: center;
`;

type ModalState = 'open' | 'closed' | 'closing';

const feed: FeedType = {
	posts: [
		{
			postId: 1,
			userId: 1,
			username: 'sangchu',
			content: 'ㅎㅇ',
			imageUrl:
				'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQw1QiRIXaQiWe1n9p_1CzPwg_GY2SmZQcF4A&usqp=CAU',
			createdAt: '2023-01-01T12:00:00.000Z',
			likesCount: 150,
			commentsCount: 300,
		},
		{
			postId: 2,
			userId: 1,
			username: 'sangchu',
			content: 'ㅂㅇ',
			imageUrl:
				'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcReVugfHzy-mUGOXAtWbyKQoymn4HPeLL9y-Q&usqp=CAU',
			createdAt: '2023-01-02T12:00:00.000Z',
			likesCount: 1500,
			commentsCount: 100,
		},
		{
			postId: 3,
			userId: 2,
			username: 'gamja',
			content: '안녕하세요 반갑습니다',
			imageUrl:
				'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQO8zd7aBnlOGUacRY6WB2FEokHlnw3DvxJiw&usqp=CAU',
			createdAt: '2023-01-01T13:00:00.000Z',
			likesCount: 300,
			commentsCount: 30,
		},
	],
	page: 1,
	total: 12,
};

export default function PostList() {
	const [menuModal, setMenuModal] = useState<ModalState>('closed');

	const [menuPostId, setMenuPostId] = useState<number | null>(null);

	const openMenuModal = (postId: number) => {
		setMenuPostId(postId);
		setMenuModal('open');
	};

	return (
		<>
			<Container>
				{feed.posts.map((post) => (
					<Post postData={post} openMenuModal={openMenuModal} />
				))}
			</Container>
			{menuModal !== 'closed' && (
				<PostMenuModal
					close={() => {
						setMenuModal('closing');
						setTimeout(() => {
							setMenuModal('closed');
							setMenuPostId(null);
						}, 500);
					}}
					isClosing={menuModal === 'closing'}
					postId={menuPostId}
				/>
			)}
		</>
	);
}
