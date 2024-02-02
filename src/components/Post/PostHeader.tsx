import styled from 'styled-components';

import ellipsis from '../../assets/Images/Post/ellipsis.svg';
import Icon from '../../shared/Icon';
import { MiniProfileType } from '../../types';

import UserInfo from './UserInfo';

const Wrapper = styled.div`
	display: flex;
	width: 95%;
	flex-direction: row;
	justify-content: space-between;
	padding-bottom: 0.75rem;

	box-sizing: border-box;
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
	user: MiniProfileType;
	showMenu: () => void;
	blockInteraction: boolean;
};

export default function PostHeader({
	user,
	showMenu,
	blockInteraction = false,
}: PostHeaderType) {
	return (
		<Wrapper>
			<UserInfo user={user} blockInteraction={blockInteraction} />
			{!blockInteraction && (
				<ExtraButton onClick={showMenu}>
					<Icon src={ellipsis} alt="ellipsis" />
				</ExtraButton>
			)}
		</Wrapper>
	);
}
