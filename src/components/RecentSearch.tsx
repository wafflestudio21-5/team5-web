import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

import { deleteRecentSearch } from '../apis/search.ts';
import SearchIcon from '../assets/Images/search.png';
import { useUserContext } from '../contexts/UserContext.tsx';
import { getColor } from '../styles/Theme.tsx';
import { MiniProfileType } from '../types.ts';

const RecentSearchLayout = styled.div`
	width: 100%;
	height: fit-content;

	display: flex;
	flex-direction: row;
	justify-content: center;
	align-items: center;

	margin-bottom: 1rem;

	& .hidden {
		display: none;
	}
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
	flex-direction: row;
	justify-content: flex-end;
	align-items: center;

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
`;

export default function RecentSearch({
	searchId,
	text,
	user,
}: {
	searchId: number;
	text: string | null;
	user: MiniProfileType | null;
}) {
	const { accessToken } = useUserContext();
	const navigate = useNavigate();
	const [isHidden, setIsHidden] = useState(false);

	const onClickCell = async () => {
		if (user) {
			navigate(`/${user.username}`);
		} else {
		}
	};

	const onClickDeleteButton = async (e: { stopPropagation: () => void }) => {
		e.stopPropagation();

		setIsHidden(true);
		await deleteRecentSearch(accessToken, searchId);
	};

	useEffect(() => {}, []);

	return (
		<RecentSearchLayout
			onClick={onClickCell}
			className={isHidden ? 'hidden' : ''}
		>
			<ImageContainer>
				<img src={user ? user.profileImageUrl : SearchIcon} alt="프로필 사진" />
			</ImageContainer>
			<UserInfoContainer>
				{user ? (
					<>
						<p className="username">{user.username}</p>
						<p className="name">{user.name}</p>
					</>
				) : (
					<p className="username">{text}</p>
				)}
			</UserInfoContainer>
			<ButtonContainer>
				<button onClick={onClickDeleteButton}>x</button>
			</ButtonContainer>
		</RecentSearchLayout>
	);
}
