import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

import { deleteRecentSearch } from '../apis/search.ts';
import deleteIcon from '../assets/Images/Search/delete.png';
import SearchIcon from '../assets/Images/search.svg';
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

	&.hidden {
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
	width: 60%;

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
	width: 10%;

	display: flex;
	flex-direction: row;
	justify-content: flex-end;
	align-items: center;

	padding-right: 1.5rem;

	& img {
		height: 0.6rem;
		width: 0.6rem;

		&:hover {
			cursor: pointer;
		}
	}
`;

export default function RecentSearch({
	searchId,
	isText,
	text,
	user,
}: {
	searchId: number;
	isText: boolean;
	text: string | null;
	user: MiniProfileType | null;
}) {
	const { accessToken } = useUserContext();
	const navigate = useNavigate();
	const [isHidden, setIsHidden] = useState(false);

	const onClickCell = async () => {
		if (user) {
			navigate(`/${user.username}`);
		}
	};

	const onClickDeleteButton = async (e: { stopPropagation: () => void }) => {
		e.stopPropagation();

		setIsHidden(true);
		await deleteRecentSearch(accessToken, searchId);
	};

	return (
		<RecentSearchLayout
			onClick={onClickCell}
			className={isHidden ? 'hidden' : ''}
		>
			<ImageContainer>
				<img
					src={!isText ? user?.profileImageUrl : SearchIcon}
					alt="프로필 사진"
				/>
			</ImageContainer>
			<UserInfoContainer>
				{!isText ? (
					<>
						<p className="username">{user?.username}</p>
						<p className="name">{user?.name}</p>
					</>
				) : (
					<p className="username">{text}</p>
				)}
			</UserInfoContainer>
			<ButtonContainer>
				<img
					src={deleteIcon}
					alt="최근 검색 삭제"
					onClick={onClickDeleteButton}
				/>
			</ButtonContainer>
		</RecentSearchLayout>
	);
}
