import styled from 'styled-components';

import Modal from '../../shared/Modal/Modal.tsx';

const FollowerModalContainer = styled.div`
	height: 40%;

	& h2 {
		font-size: 1.5rem;
		font-weight: 500;
		margin: 1rem 0;
	}
`;

const CellContainer = styled.div`
	display: flex;
	flex-direction: column;
	align-items: flex-start;

	width: 100%;
`;

const Cell = styled.div`
	display: flex;
	flex-direction: row;
	align-items: center;

	width: 100%;

	&:hover {
		cursor: pointer;
	}
`;

type Props = {
	close: () => void;
	isClosing: boolean;
};

export default function FollowerModal({ close, isClosing }: Props) {
	return (
		<Modal onBackgroundClick={close} isClosing={isClosing}>
			<FollowerModalContainer>
				<CellContainer>
					<Cell>
						<p>팔로워 삭제</p>
					</Cell>
				</CellContainer>
			</FollowerModalContainer>
		</Modal>
	);
}
