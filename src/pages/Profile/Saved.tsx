import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

import { resetAccessToken } from '../../apis/login.ts';
import back from '../../assets/Images/Profile/back.png';
import { useUserContext } from '../../contexts/UserContext.tsx';
import Icon from '../../shared/Icon.tsx';

const SavedLayout = styled.div`
	width: 100%;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
`;

const HeaderContainer = styled.div`
	width: 95%;
	display: flex;
	flex-direction: row;
	justify-content: space-between;
	align-items: center;
	margin-bottom: 2.5rem;

	& h2 {
		margin: 0 auto 0 2rem;
	}
`;

const PostContainer = styled.div`
	width: 100%;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
`;

export default function Saved() {
	const navigate = useNavigate();
	const { username } = useUserContext();

	return (
		<SavedLayout>
			<HeaderContainer>
				<Icon src={back} alt="취소" onClick={() => navigate(`/${username}`)} />
				<h2>저장됨</h2>
			</HeaderContainer>
			<PostContainer>{/*추가 예정*/}</PostContainer>
		</SavedLayout>
	);
}
