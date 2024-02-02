import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

import {
	fetchUserInformation,
	updateAccountToOpen,
	updateAccountToPrivate,
} from '../../apis/account.ts';
import Bookmark from '../../assets/Images/Profile/Menu/Bookmark.png';
import Key from '../../assets/Images/Profile/Menu/Key.png';
import Lock from '../../assets/Images/Profile/Menu/Lock.png';
import Logout from '../../assets/Images/Profile/Menu/Logout.png';
import { useUserContext } from '../../contexts/UserContext.tsx';
import Icon from '../../shared/Icon.tsx';
import Modal from '../../shared/Modal/Modal.tsx';
import { getColor } from '../../styles/Theme.tsx';
import { UserType } from '../../types.ts';
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
}: {
	close: () => void;
	isClosing: boolean;
}) {
	const {
		accessToken,
		setAccessToken,
		currentUser,
		setCurrentUser,
		username,
		isMyAccountPrivate,
	} = useUserContext();

	const onClickUpdateAccountToOpen = async () => {
		try {
			await updateAccountToOpen(accessToken);
			await fetchUserInformation(accessToken, currentUser, setCurrentUser);
		} catch {
			alert('Error occurred.');
		}
	};

	const onClickUpdateAccountToPrivate = async () => {
		try {
			await updateAccountToPrivate(accessToken);
			await fetchUserInformation(accessToken, currentUser, setCurrentUser);
		} catch {
			alert('Error occurred.');
		}
	};

	const onClickLogout = () => {
		localStorage.removeItem('refreshToken');
		setAccessToken('null');
		setCurrentUser({} as UserType);
		navigate('/');
	};

	const navigate = useNavigate();

	return (
		<Modal onBackgroundClick={close} isClosing={isClosing}>
			<MenuModalContainer>
				<CellContainer>
					<Cell onClick={() => navigate(`/${username}/saved`)}>
						<Icon src={Bookmark} alt="저장됨" />
						<p>저장됨</p>
					</Cell>
					{isMyAccountPrivate ? (
						<Cell onClick={onClickUpdateAccountToOpen}>
							<Icon src={Logout} alt="계정 공개 여부 설정" />
							<p>계정 공개 전환</p>
						</Cell>
					) : (
						<Cell onClick={onClickUpdateAccountToPrivate}>
							<Icon src={Lock} alt="계정 공개 여부 설정" />
							<p>계정 비공개 전환</p>
						</Cell>
					)}
					<Cell onClick={() => navigate('/account/changePassword')}>
						<Icon src={Key} alt="비밀번호 변경" />
						<p>비밀번호 변경</p>
					</Cell>
					<Cell onClick={onClickLogout}>
						<Icon src={Logout} alt="로그아웃" />
						<p className="logout">로그아웃</p>
					</Cell>
				</CellContainer>
			</MenuModalContainer>
		</Modal>
	);
}
