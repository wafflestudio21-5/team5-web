import { useEffect } from 'react';
import styled from 'styled-components';

import comments from '../../test/data/comments.json';

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
	useEffect(() => {});

	return (
		<CommentListWrapper>
			{comments.map((comment) => (
				<Comment comment={comment} key={comment.id} />
			))}
		</CommentListWrapper>
	);
}
