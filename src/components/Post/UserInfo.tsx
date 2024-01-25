import styled from 'styled-components';

import { getColor } from '../../styles/Theme';
import { UserType } from '../../types';

const Container = styled.div`
	display: flex;
	gap: 1rem;
`;

const StyledLink = styled.a`
	text-decoration: none;
	color: ${getColor('black')};
`;

const ImageBox = styled.div`
	width: 2rem;
	height: 2rem;
	border-radius: 70%;
	overflow: hidden;
	display: inline;
	border: 1px solid rgb(214, 214, 214);
`;

const ProfileImage = styled.img`
	width: 100%;
	height: 100%;
	object-fit: cover;
`;

const NameBox = styled.div`
	display: flex;
	align-items: center;
`;

type UserInfoProps = {
	user: UserType;
};

export default function UserInfo({ user }: UserInfoProps) {
	return (
		<StyledLink>
			<Container>
				<ImageBox>
					<ProfileImage src={user.profileImageUrl} alt="profile image" />
				</ImageBox>
				<NameBox>
					<span>
						<b>{user.username}</b>
					</span>
				</NameBox>
			</Container>
		</StyledLink>
	);
}
