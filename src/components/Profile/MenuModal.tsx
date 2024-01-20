import axios from 'axios';
import styled from 'styled-components';

import post from '../../assets/Images/Profile/AddPost/post.png';
import story from '../../assets/Images/Profile/AddPost/story.png';
import { baseURL } from '../../constants.ts';
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

type Props = {
	close: () => void;
	isClosing: boolean;
};

export default function MenuModal({ close, isClosing }: Props) {
	const { accessToken } = useUserContext();

	const updateAccountToPrivate = async () => {
		try {
			const response = await axios.put(
				`${baseURL}/api/v1/account/toprivate`,
				{
					message: 'Change non-private account to private account.',
				},
				{
					headers: {
						Authorization: `Bearer ${accessToken}`,
					},
				}
			);

			return response.data;
		} catch {
			alert('공개 계정을 비공개 계정으로 전환할 수 없습니다.');
		}
	};

	const updateAccountToOpen = async () => {
		try {
			const response = await axios.put(
				`${baseURL}/api/v1/account/toopen`,
				{
					message: 'Change private account to non-private account.',
				},
				{
					headers: {
						Authorization: `Bearer ${accessToken}`,
					},
				}
			);

			return response.data;
		} catch {
			alert('비공개 계정을 공개 계정으로 전환할 수 없습니다.');
		}
	};

	return (
		<Modal onBackgroundClick={close} isClosing={isClosing}>
			<MenuModalContainer>
				<CellContainer>
					<Cell>
						<Icon src={story} alt="저장됨" />
						<p>저장됨</p>
					</Cell>
					<Cell onClick={updateAccountToPrivate}>
						<Icon src={post} alt="계정 공개 여부 설정" />
						<p>계정 비공개 전환</p>
					</Cell>
					<Cell onClick={updateAccountToOpen}>
						<Icon src={post} alt="계정 공개 여부 설정" />
						<p>계정 공개 전환</p>
					</Cell>
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
