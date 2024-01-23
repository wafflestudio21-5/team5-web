import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

import {
	updateAccountToPrivate,
	updateAccountToOpen,
} from '../../apis/user.ts';
import post from '../../assets/Images/Profile/AddPost/post.png';
import story from '../../assets/Images/Profile/AddPost/story.png';
import { useUserContext } from '../../contexts/UserContext.tsx';
import Icon from '../../shared/Icon.tsx';
import Modal from '../../shared/Modal/Modal.tsx';
import { getColor } from '../../styles/Theme.tsx';

const MenuModalContainer = styled.div`
	height: 40%;
`;

const CellContainer = styled.div`
	display: flex;
	flex-direction: column;
	align-items: flex-start;

	width: 100%;
	margin-top: 1rem;
`;

const Cell = styled.div`
	display: flex;
	flex-direction: row;
	align-items: center;

	width: 100%;

	&:hover {
		cursor: pointer;
	}

	& .logout {
		font-weight: 600;
		color: ${getColor('red')};
	}
`;

export default function MenuModal({
	close,
	isClosing,
	isPrivate,
}: {
	close: () => void;
	isClosing: boolean;
	isPrivate: boolean;
}) {
	const { username, accessToken } = useUserContext();

	const onClickUpdateAccountToOpen = async () => {
		try {
			await updateAccountToOpen(accessToken);
		} catch {
			alert('Error occurred.');
		}
	};

	const onClickUpdateAccountToPrivate = async () => {
		try {
			await updateAccountToPrivate(accessToken);
		} catch {
			alert('Error occurred.');
		}
	};

	const navigate = useNavigate();

	return (
		<Modal onBackgroundClick={close} isClosing={isClosing}>
			<MenuModalContainer>
				<CellContainer>
					<Cell onClick={() => navigate(`/${username}/saved`)}>
						<Icon src={story} alt="저장됨" />
						<p>저장됨</p>
					</Cell>
					({isPrivate} ? (
					<Cell onClick={onClickUpdateAccountToOpen}>
						<Icon src={post} alt="계정 공개 여부 설정" />
						<p>계정 공개 전환</p>
					</Cell>
					) : (
					<Cell onClick={onClickUpdateAccountToPrivate}>
						<Icon src={post} alt="계정 공개 여부 설정" />
						<p>계정 비공개 전환</p>
					</Cell>
					))
					<Cell>
						<Icon src={story} alt="비밀번호 변경" />
						<p>비밀번호 변경</p>
					</Cell>
					<Cell>
						<Icon src={story} alt="로그아웃" />
						<p className="logout">로그아웃</p>
					</Cell>
				</CellContainer>
			</MenuModalContainer>
		</Modal>
	);
}
