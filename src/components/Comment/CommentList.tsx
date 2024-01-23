import { useEffect } from 'react';
import styled from 'styled-components';

import { CommentType } from '../../types';
import { users } from '../Feed';

import Comment from './Comment';

const CommentListWrapper = styled.ul`
	padding: 0;
	margin: 0;
	width: 100%;
	gap: 1rem;
	display: flex;
	flex-direction: column;
`;

export default function CommentList() {
	const comments: CommentType[] = [
		{
			id: 1,
			user: users[0],
			content: '안녕하세요',
			createdAt: '2023-01-01T12:30:00.000Z',
		},
		{
			id: 2,
			user: users[1],
			content: '멋있어요!',
			createdAt: '2023-01-01T12:31:00.000Z',
		},
		{
			id: 3,
			user: users[2],
			content: '미ㅏ어리어ㅣㄹ마어ㅣㅏㅓㅁㄹ아ㅣㅁㄹ',
			createdAt: '2023-01-01T12:35:00.000Z',
		},
	];

	useEffect(() => {});

	return (
		<CommentListWrapper>
			{comments.map((comment) => (
				<Comment comment={comment} key={comment.id} />
			))}
		</CommentListWrapper>
	);
}
