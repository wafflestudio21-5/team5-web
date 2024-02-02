import styled from 'styled-components';

import { deleteFollower } from '../../apis/user.ts';
import { useUserContext } from '../../contexts/UserContext.tsx';
import Modal from '../../shared/Modal/Modal.tsx';
import { getColor } from '../../styles/Theme.tsx';

const FollowerModalContainer = styled.div`
	height: 7.5%;

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
	margin-top: 1.5rem;
`;

const Cell = styled.div`
	display: flex;
	flex-direction: row;
	justify-content: center;
	align-items: center;

	width: 100%;

	&:hover {
		cursor: pointer;
	}

	& p {
		font-weight: 500;
		color: ${getColor('red')};
	}
`;

type Props = {
	close: () => void;
	isClosing: boolean;
	username: string;
};

export default function FollowerModal({ close, isClosing, username }: Props) {
	const { accessToken } = useUserContext();

	const onClickDeleteFollower = async () => {
		close();
		await deleteFollower(username, accessToken);
	};

	return (
		<Modal onBackgroundClick={close} isClosing={isClosing}>
			<FollowerModalContainer>
				<CellContainer>
					<Cell onClick={onClickDeleteFollower}>
						<p>팔로워 삭제</p>
					</Cell>
				</CellContainer>
			</FollowerModalContainer>
		</Modal>
	);
}
