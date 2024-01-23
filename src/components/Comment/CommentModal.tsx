import styled from 'styled-components';

import Modal from '../../shared/Modal/Modal';
import { getColor } from '../../styles/Theme';
import { PostType } from '../../types';

import CommentInput from './CommentInput';
import CommentList from './CommentList';

const ModalContent = styled.div`
	display: flex;
	flex-direction: column;
	gap: 0.5rem;
	width: 430px;
	padding: 0.5rem;
	background-color: ${getColor('grey')};
	border-radius: 0.5rem 0.5rem 0 0;
`;

export default function CommentModal({
	post,
	close,
	isClosing,
}: {
	post: PostType | null;
	close: () => void;
	isClosing: boolean;
}) {
	return (
		post && (
			<Modal onBackgroundClick={close} isClosing={isClosing}>
				<ModalContent>
					<h3>댓글</h3>
					<CommentList />
					<CommentInput post={post} commentType={'comment'} />
				</ModalContent>
			</Modal>
		)
	);
}
