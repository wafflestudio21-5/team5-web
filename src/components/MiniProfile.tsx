import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

import { fetchUserInformation } from '../apis/account.ts';
import { addUserToRecentSearch } from '../apis/search.ts';
import {
	acceptFollowRequest,
	cancelRequestFollowToPrivateUser,
	deleteFollower,
	followPublicUser,
	getUserInformation,
	rejectFollowRequest,
	requestFollowToPrivateUser,
	unfollowUser,
} from '../apis/user.ts';
import { useUserContext } from '../contexts/UserContext.tsx';
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

	& button.hidden {
		display: none;
	}

	& button.blue {
		background-color: ${getColor('blue')};
		color: ${getColor('white')};
	}

	& button.margin {
		margin-right: 0.5rem;
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
	action,
}: {
	user: MiniProfileType;
	action: string;
}) {
	const { accessToken, currentUser, setCurrentUser } = useUserContext();
	const navigate = useNavigate();

	const [isHidden, setIsHidden] = useState<boolean>(false);
	const [buttonLabel, setButtonLabel] = useState<string>('');
	const [buttonClass, setButtonClass] = useState<string>('');

	const onClickCell = async () => {
		navigate(`/${user.username}`);

		if (action === 'hideButton') {
			await addUserToRecentSearch(accessToken, user.username);
		}
	};

	const onClickButton = async (e: { stopPropagation: () => void }) => {
		e.stopPropagation();

		// 팔로우 하고 있지 않다면
		if (buttonLabel === '팔로우') {
			const userInfo = await getUserInformation(user.username, accessToken);

			// 비공개 계정이면 팔로우 요청
			if (userInfo.isPrivate) {
				setButtonLabel('요청됨');
				setButtonClass('grey');

				await requestFollowToPrivateUser(user.username, accessToken);
				// 공개 계정이면 바로 팔로우
			} else {
				setButtonLabel('팔로잉');
				setButtonClass('grey');
				await followPublicUser(user.username, accessToken);
			}
			// 팔로잉 중이면 언팔
		} else if (buttonLabel === '팔로잉') {
			setButtonLabel('팔로우');
			setButtonClass('blue');
			await unfollowUser(user.username, accessToken);
			// 팔로우 요청을 보냈으면 취소
		} else if (buttonLabel === '요청됨') {
			setButtonLabel('팔로우');
			setButtonClass('blue');
			await cancelRequestFollowToPrivateUser(user.username, accessToken);
			// 팔로워 목록에서 삭제
		} else if (buttonLabel === '삭제') {
			setIsHidden(true);
			await deleteFollower(user.username, accessToken);
		}

		await fetchUserInformation(accessToken, currentUser, setCurrentUser);
	};

	const onClickAcceptRequest = async (e: { stopPropagation: () => void }) => {
		e.stopPropagation();

		setIsHidden(true);
		await acceptFollowRequest(user.username, accessToken);
	};

	const onClickRejectRequest = async (e: { stopPropagation: () => void }) => {
		e.stopPropagation();

		setIsHidden(true);
		await rejectFollowRequest(user.username, accessToken);
	};

	useEffect(() => {
		if (action == '팔로우') {
			setButtonLabel('팔로우');
			setButtonClass('blue');
		} else if (action == '팔로잉') {
			setButtonLabel('팔로잉');
			setButtonClass('grey');
		} else if (action == '삭제') {
			setButtonLabel('삭제');
			setButtonClass('delete');
		} else if (action == '요청됨') {
			setButtonLabel('요청됨');
			setButtonClass('grey');
		}
	}, []);

	return (
		<MiniProfileLayout
			onClick={onClickCell}
			className={isHidden ? 'hidden' : ''}
		>
			<ImageContainer>
				<img src={user.profileImageUrl} alt="프로필 사진" />
			</ImageContainer>
			<UserInfoContainer>
				<p className="username">{user.username}</p>
				<p className="name">{user.name}</p>
			</UserInfoContainer>
			{action !== 'hideButton' && action === '알림' ? (
				<ButtonContainer>
					<button onClick={onClickAcceptRequest} className="blue margin">
						확인
					</button>
					<button onClick={onClickRejectRequest} className="grey">
						삭제
					</button>
				</ButtonContainer>
			) : (
				<ButtonContainer>
					<button onClick={onClickButton} className={buttonClass}>
						{buttonLabel}
					</button>
				</ButtonContainer>
			)}
		</MiniProfileLayout>
	);
}
