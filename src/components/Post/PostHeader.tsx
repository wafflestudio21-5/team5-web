import styled from 'styled-components';

import ellipsis from '../../assets/Images/Post/ellipsis.svg';
import Icon from '../../shared/Icon';

import UserInfo from './UserInfo';

const Wrapper = styled.div`
	display: flex;
	width: 100%;
	flex-direction: row;
	justify-content: space-between;
	padding-bottom: 0.75rem;
	padding-left: 0.25rem;
`;

const ExtraButton = styled.button`
	background-color: transparent;
	border: none;
	padding: 0;
	display: flex;
	align-items: center;
	& img {
		width: 2em;
		height: 1.5em;
	}
`;

type PostHeaderType = {
	username: string;
	userImage?: string;
	showMenu: () => void;
};

export default function PostHeader({
	username,
	userImage,
	showMenu,
}: PostHeaderType) {
	return (
		<Wrapper>
			<UserInfo username={username} userImage={userImage} />
			<ExtraButton onClick={showMenu}>
				<Icon src={ellipsis} alt="ellipsis" />
			</ExtraButton>
		</Wrapper>
	);
}
