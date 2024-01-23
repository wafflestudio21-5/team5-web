import { useState } from 'react';
import styled from 'styled-components';

import { getColor } from '../styles/Theme.tsx';
import { FeedType, UserType } from '../types.ts';

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

const users: UserType[] = [
	{
		name: '상추',
		username: 'sangchu',
		id: 1,
		profileImageUrl:
			'https://wafflestudio.com/static/images/DefaultProfileImage.svg',
		isPrivate: false,
	},
	{
		name: '감자',
		username: 'gamja',
		id: 2,
		profileImageUrl:
			'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRYeYsx-pISnYjDS1YiUL4uGA-I6yAcf1sSuA&usqp=CAU',
		isPrivate: false,
	},
	{
		name: '배추',
		username: 'baechu',
		id: 3,
		profileImageUrl:
			'https://wafflestudio.com/static/images/DefaultProfileImage.svg',
		isPrivate: false,
	},
];

const feed: FeedType = {
	posts: [
		{
			postId: 1,
			user: users[0],
			content: 'ㅎㅇ',
			imageUrl:
				'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQw1QiRIXaQiWe1n9p_1CzPwg_GY2SmZQcF4A&usqp=CAU',
			createdAt: '2023-01-01T12:00:00.000Z',
			likesCount: 150,
			commentsCount: 300,
		},
		{
			postId: 2,
			user: users[0],
			content: 'ㅂㅇ',
			imageUrl:
				'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcReVugfHzy-mUGOXAtWbyKQoymn4HPeLL9y-Q&usqp=CAU',
			createdAt: '2023-01-02T12:00:00.000Z',
			likesCount: 1500,
			commentsCount: 100,
		},
		{
			postId: 3,
			user: users[1],
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

export default function Feed() {
	const [menuModal, setMenuModal] = useState<ModalState>('closed');
	const [commentModal, setCommentModal] = useState<ModalState>('closed');

	const [menuPostId, setMenuPostId] = useState<number | null>(null);
	const [commentPostId, setCommentPostId] = useState<number | null>(null);

	const openMenuModal = (postId: number) => {
		setMenuPostId(postId);
		setMenuModal('open');
	};

	const openCommentModal = (postId: number) => {
		setCommentPostId(postId);
		console.log('?');
		setCommentModal('open');
	};

	return (
		<>
			<Container>
				{feed.posts.map((post) => (
					<Post
						postData={post}
						openMenuModal={openMenuModal}
						openCommentModal={openCommentModal}
					/>
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
					postId={commentPostId}
					isClosing={commentModal === 'closing'}
					close={() => {
						setCommentModal('closing');
						setTimeout(() => {
							setCommentModal('closed');
							setCommentPostId(null);
						}, 300);
					}}
				/>
			)}
		</>
	);
}
