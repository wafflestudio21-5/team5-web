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
	padding-left: 0.5rem;
	padding-right: 0.5rem;
	box-sizing: border-box;
	overflow-y: scroll;
`;

export default function CommentList({
	comments,
	handlePostReply,
	handleDeleteComment,
	setReload,
}: {
	comments: CommentType[];
	handlePostReply: (comment: CommentType) => void;
	handleDeleteComment: (comment: CommentType) => void;
	setReload: (reload: boolean) => void;
}) {
	return (
		<CommentListWrapper>
			{comments.map((comment) => (
				<Comment
					comment={comment}
					handlePostReply={handlePostReply}
					handleDeleteComment={handleDeleteComment}
					setReload={setReload}
				/>
			))}
		</CommentListWrapper>
	);
}
