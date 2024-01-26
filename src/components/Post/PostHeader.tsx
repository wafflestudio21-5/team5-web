import styled from 'styled-components';

import ellipsis from '../../assets/Images/Post/ellipsis.svg';
import Icon from '../../shared/Icon';
import { UserType } from '../../types';

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
	user: UserType;
	showMenu: () => void;
};

export default function PostHeader({ user, showMenu }: PostHeaderType) {
	return (
		<Wrapper>
			<UserInfo user={user} />
			<ExtraButton onClick={showMenu}>
				<Icon src={ellipsis} alt="ellipsis" />
			</ExtraButton>
		</Wrapper>
	);
}
