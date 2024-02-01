import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

import { getColor } from '../styles/Theme.tsx';
import { MiniProfileType } from '../types.ts';

const MiniProfileLayout = styled.div`
	width: 100%;
	height: fit-content;

	display: flex;
	flex-direction: row;
	justify-content: center;
	align-items: center;

	margin-bottom: 1rem;
`;

const ImageContainer = styled.div`
	width: 30%;

	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;

	& img {
		width: 4rem;
		height: 4rem;
		border-radius: 50%;
		overflow: hidden;
	}
`;

const UserInfoContainer = styled.div`
	width: 45%;

	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: flex-start;

	& p {
		font-size: 1.1rem;
		margin: 0;
	}

	& p.username {
		font-weight: 700;
	}

	& p.name {
		font-weight: 500;
		color: ${getColor('grey')};
	}
`;

const ButtonContainer = styled.div`
	width: 35%;

	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: flex-end;

	padding-right: 1.5rem;

	& button {
		width: 100%;
		height: 2.3rem;

		font-size: 1rem;
		font-weight: 600;
		padding: 0.5rem 1rem;

		border: none;
		border-radius: 0.5rem;

		&:hover {
			cursor: pointer;
		}
	}

	& button.hidden {
		display: none;
	}

	& button.blue {
		background-color: ${getColor('blue')};
		color: ${getColor('white')};
	}

	& button.grey {
		background-color: ${getColor('extraLightGrey')};
		color: ${getColor('black')};
	}

	& button.delete {
		width: 60%;
		background-color: ${getColor('extraLightGrey')};
		color: ${getColor('black')};
	}
`;

export default function MiniProfile({
	user,
	buttonLabel,
	onClickButton,
}: {
	user: MiniProfileType;
	buttonLabel: string;
	onClickButton: () => void;
}) {
	const navigate = useNavigate();

	const buttonClass = () => {
		if (buttonLabel === 'hidden') return 'hidden';
		else if (buttonLabel === '팔로우') return 'blue';
		else if (buttonLabel === '팔로잉') return 'grey';
		else if (buttonLabel === '삭제') return 'delete';
		else if (buttonLabel === 'X') return 'grey';
	};

	return (
		<MiniProfileLayout onClick={() => navigate(`/${user.username}`)}>
			<ImageContainer>
				{/*<img src={user.profileImageUrl} alt="프로필 사진" />*/}
				<img src={user.profileImageUrl} alt="프로필 사진" />
			</ImageContainer>
			<UserInfoContainer>
				<p className="username">{user.username}</p>
				<p className="name">{user.name}</p>
			</UserInfoContainer>
			<ButtonContainer>
				<button onClick={onClickButton} className={buttonClass()}>
					{buttonLabel}
				</button>
			</ButtonContainer>
		</MiniProfileLayout>
	);
}
