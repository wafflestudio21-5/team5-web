import styled from 'styled-components';

import Modal from '../../shared/Modal/Modal';
import { getColor } from '../../styles/Theme';

import CommentList from './CommentList';

const ModalContent = styled.div`
	display: flex;
	flex-direction: column;
	gap: 0.5rem;
	width: 430px;
	padding: 1rem;
	background-color: ${getColor('grey')};
	border-radius: 0.5rem 0.5rem 0 0;
`;

export default function CommentModal({
	postId,
	close,
	isClosing,
}: {
	postId: number | null;
	close: () => void;
	isClosing: boolean;
}) {
	return (
		<Modal onBackgroundClick={close} isClosing={isClosing}>
			<ModalContent>
				<h1>댓글</h1>
				<CommentList />
			</ModalContent>
		</Modal>
	);
}
