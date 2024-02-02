import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

import InstagramLogo from '../../assets/Images/Instagram.png';
import LikeIcon from '../../assets/Images/Post/like.svg';
import Icon from '../Icon.tsx';

const InstagramHeaderContainer = styled.div`
	width: 100%;
	height: fit-content;
	display: flex;
	flex-direction: row;
	justify-content: space-between;
	align-items: center;
	margin-bottom: 1.5rem;

	& img {
		height: fit-content;

		&:hover {
			cursor: pointer;
		}
	}

	& img.logo {
		width: 30%;
		margin-left: 1rem;
	}

	& img.icon {
		margin-right: 1rem;
	}
`;

export default function InstagramHeader() {
	const navigate = useNavigate();

	return (
		<InstagramHeaderContainer>
			<img
				src={InstagramLogo}
				alt="메인"
				className="logo"
				onClick={() => navigate('/')}
			/>
			<Icon
				src={LikeIcon}
				alt="알림"
				className="icon"
				onClick={() => navigate('/notification')}
			/>
		</InstagramHeaderContainer>
	);
}
