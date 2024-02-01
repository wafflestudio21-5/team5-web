import styled from 'styled-components';

import { CommentType } from '../../types';

import Comment from './Comment';

const CommentListWrapper = styled.ul`
	padding: 0;
	margin: 0;
	width: 100%;
	height: 100%;
	gap: 1rem;
	display: flex;
	flex-direction: column;
	padding-left: 0.5rem;
	padding-right: 0.5rem;
	box-sizing: border-box;
	overflow-y: scroll;
	-ms-overflow-style: none; /* 인터넷 익스플로러 */
	scrollbar-width: none;
	&::-webkit-scrollbar {
		display: none;
	}
`;

export default function CommentList({
	comments,
	handlePostReply,
	handleDeleteComment,
	setReload,
	postAuthorId,
}: {
	comments: CommentType[];
	handlePostReply: (comment: CommentType) => void;
	handleDeleteComment: (comment: CommentType) => void;
	setReload: (reload: boolean) => void;
	postAuthorId: number;
}) {
	return (
		<CommentListWrapper>
			{comments.map((comment) => (
				<Comment
					comment={comment}
					handlePostReply={handlePostReply}
					handleDeleteComment={handleDeleteComment}
					setReload={setReload}
					postAuthorId={postAuthorId}
				/>
			))}
		</CommentListWrapper>
	);
}
