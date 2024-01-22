import { useEffect } from 'react';
import styled from 'styled-components';

import { CommentType } from '../../types';

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
			commentId: 1,
			userId: 1,
			username: 'sangchu',
			content: '안녕하세요',
			createdAt: '2023-01-01T12:30:00.000Z',
		},
		{
			commentId: 2,
			userId: 2,
			username: 'gamja',
			content: '멋있어요!',
			createdAt: '2023-01-01T12:31:00.000Z',
		},
		{
			commentId: 3,
			userId: 3,
			username: 'iamjam',
			content: '미ㅏ어리어ㅣㄹ마어ㅣㅏㅓㅁㄹ아ㅣㅁㄹ',
			createdAt: '2023-01-01T12:35:00.000Z',
		},
	];

	useEffect(() => {});

	return (
		<CommentListWrapper>
			{comments.map((comment) => (
				<Comment comment={comment} key={comment.commentId} />
			))}
		</CommentListWrapper>
	);
}
