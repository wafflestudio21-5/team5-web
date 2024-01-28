import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import styled from 'styled-components';

import {
	getUserInformation,
	getUserFollowStatus,
	getUserFollowMeStatus,
	getFollowRequestStatus,
	getFollowRequestToMeStatus,
	requestFollowToPrivateUser,
	followPublicUser,
	unfollowUser,
	cancelRequestFollowToPrivateUser,
} from '../../apis/user.ts';
import addPost from '../../assets/Images/Profile/add-post.png';
import defaultProfile from '../../assets/Images/Profile/default-profile.svg';
import menu from '../../assets/Images/Profile/menu.png';
import AddPostModal from '../../components/Profile/AddPostModal.tsx';
import FollowerModal from '../../components/Profile/FollowerModal.tsx';
import LinkModal from '../../components/Profile/LinkModal.tsx';
import MenuModal from '../../components/Profile/MenuModal.tsx';
import ToggleBar from '../../components/Profile/ToggleBar.tsx';
import { useUserContext } from '../../contexts/UserContext.tsx';
import Icon from '../../shared/Icon.tsx';
import { getColor } from '../../styles/Theme.tsx';
import { UserType } from '../../types.ts';

const ProfileLayout = styled.main`
	width: 100%;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
`;

const HeaderContainer = styled.div`
	width: 100%;
	display: flex;
	flex-direction: row;
	justify-content: space-between;
	align-items: center;
	margin-bottom: 1.5rem;

	& h2 {
		margin: 0 1rem;
	}

	& img {
		height: 1.7rem;
		width: 1.7rem;
		margin-right: 1rem;

		&:hover {
			cursor: pointer;
		}
	}
`;

// 내 프로필 페이지 or 내 팔로워 아니면 우측 상단 아이콘 숨기기
const IconContainer = styled.div<{
	isMyAccount: boolean;
	isMyFollower: boolean;
}>`
	display: ${(props) =>
		!props.isMyAccount && !props.isMyFollower ? 'none' : 'block'};
`;

// 팔로우 요청 수락 or 거절 컨테이너
const FollowRequestContainer = styled.div`
	width: 100%;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	margin-bottom: 1.5rem;

	& p {
		margin: 0 1rem;
	}

	& div {
		display: flex;
		flex-direction: row;
		justify-content: center;
		align-items: center;
	}

	& button {
		padding: 0.5rem 1rem;

		border: none;
		border-radius: 0.5rem;

		&:hover {
			cursor: pointer;
		}
	}
`;

// 사진, 게시물, 팔로워, 팔로잉
const UserInfoContainer = styled.div`
	width: 100%;
	display: flex;
	flex-direction: row;
	justify-content: center;
	align-items: center;

	// 프로필 사진
	& img {
		height: 6rem;
		width: 6rem;
		border-radius: 50%;
		margin: 0 1rem;

		&:hover {
			cursor: pointer;
		}
	}

	// 게시물, 팔로워, 팔로잉과 숫자 담는 div
	& div {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		margin: 0 1.5rem;

		&:hover {
			cursor: pointer;
		}

		// 숫자
		& h2 {
			font-size: 1.5rem;
			margin: 0;
		}

		// 게시물, 팔로워, 팔로잉
		& p {
			font-size: 1rem;
			margin: 0;
		}
	}
`;

// 이름, 소개
const UserProfileContainer = styled.div`
	width: 100%;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: flex-start;
	margin-bottom: 1rem;

	& h3 {
		margin: 0.5rem 1rem 0 1rem;
		font-weight: 500;
	}

	& p {
		margin: 0.2rem 1rem 0 1rem;
	}

	& a {
		margin: 0.2rem 1rem 0 1rem;
		color: ${getColor('darkBlue')};
		text-decoration: none;
	}

	& p.links {
		font-weight: 700;

		&:hover {
			cursor: pointer;
		}
	}
`;

type ButtonProps = {
	isMyAccount: boolean;
	isFollow: boolean;
	isPrivate: boolean;
	isFollowRequestToPrivate: boolean;
};

const ButtonContainer = styled.div<ButtonProps>`
	width: 100%;
	display: flex;
	flex-direction: row;
	justify-content: center;
	align-items: center;
	margin-bottom: 2rem;

	& button {
		width: 45%;
		margin: 0.5rem;

		font-size: 1rem;
		font-weight: 500;
		padding: 0.5rem 1rem;

		border: none;
		border-radius: 0.5rem;

		&:hover {
			cursor: pointer;
		}
	}

	& .leftButton {
		width: ${(props) =>
			!props.isMyAccount && props.isPrivate ? '100%' : '45%'};
		font-weight: ${(props) => (props.isMyAccount ? '500' : '700')};
		color: ${(props) =>
			props.isMyAccount || props.isFollow || props.isFollowRequestToPrivate
				? getColor('black')
				: getColor('white')};
		background-color: ${(props) =>
			props.isMyAccount || props.isFollow || props.isFollowRequestToPrivate
				? getColor('white')
				: getColor('blue')};
	}

	& .rightButton {
		width: ${(props) => (!props.isMyAccount && props.isPrivate ? '0%' : '45%')};
	}
`;

const PostContainer = styled.div`
	width: 100%;
	display: flex;
	flex-direction: row;
	justify-content: space-between;
	align-items: center;
`;

// 모달 상태 관리 타입
type modalStateType = 'open' | 'closed' | 'closing';

export default function Profile() {
	// 모달 관련
	const [addPostModal, setAddPostModal] = useState<modalStateType>('closed');
	const [menuModal, setMenuModal] = useState<modalStateType>('closed');
	const [followerModal, setFollowerModal] = useState<modalStateType>('closed');
	const [linkModal, setLinkModal] = useState<modalStateType>('closed');

	// 페이지 이동
	const navigate = useNavigate();

	// ToggleBar 탭 상태 관리
	const [activeTab, setActiveTab] = useState<'left' | 'right'>('left');

	// id로 유저 정보 가져오기
	const { id } = useParams();
	const { username, accessToken, isMyAccountPrivate } = useUserContext();

	const [user, setUser] = useState<UserType | undefined>();
	const [isMyAccount, setIsMyAccount] = useState(false);
	const [isFollow, setIsFollow] = useState(false);
	const [isPrivate, setIsPrivate] = useState(false);
	const [isFollowRequestToPrivate, setIsFollowRequestToPrivate] =
		useState(false);
	const [isMyFollower, setIsMyFollower] = useState(false); // 독립적
	const [isFollowRequestToMe, setIsFollowRequestToMe] = useState(false); // 내가 비공개일 때 나에게 팔로우 요청을 보냈는지 확인

	useEffect(() => {
		const fetchUserData = async () => {
			if (!id) {
				navigate('/');
				return;
			}

			try {
				const userInfo = await getUserInformation(id, accessToken);
				if (!userInfo) {
					navigate('/');
					return;
				}
				setUser(userInfo);

				// 내 계정인지 판단
				if (userInfo.username === username) {
					setIsMyAccount(true);
				} else {
					// 팔로잉 여부 판단
					const followStatus = await getUserFollowStatus(
						userInfo.username,
						accessToken
					);
					if (followStatus) {
						setIsFollow(followStatus);
					} else {
						// 팔로잉 하지 않으면 비공개 여부 판단
						if (userInfo.isPrivate) {
							setIsPrivate(true);
							const followRequestStatus = await getFollowRequestStatus(
								userInfo.username,
								accessToken
							);
							// 팔로우 요청 여부 판단
							if (followRequestStatus) {
								setIsFollowRequestToPrivate(followRequestStatus);
							}
						}
					}
					// 내 팔로워인지 판단
					const followMeStatus = await getUserFollowMeStatus(
						userInfo.username,
						accessToken
					);
					if (followMeStatus) {
						setIsMyFollower(followMeStatus);
					} else {
						// 내가 비공개 계정일 때 나에게 팔로우 요청을 보냈는지 판단
						if (isMyAccountPrivate) {
							const followRequestToMeStatus = await getFollowRequestToMeStatus(
								userInfo.username,
								accessToken
							);
							if (followRequestToMeStatus) {
								setIsFollowRequestToMe(followRequestToMeStatus);
							}
						}
					}
				}
			} catch {
				navigate('/');
			}
		};

		fetchUserData();
	}, []);

	// 계정 공개 여부에 따라 팔로워, 팔로잉 버튼 클릭 여부 결정
	const handleFollowersClick = () => {
		if (!isPrivate) {
			navigate(`/${id}/followers`);
		}
	};

	const handleFollowingClick = () => {
		if (!isPrivate) {
			navigate(`/${id}/following`);
		}
	};

	// 계정 조건에 따라 버튼 라벨 변경
	const getButtonLabel = () => {
		if (isMyAccount) return '프로필 편집';
		if (isFollow) return '팔로잉';
		if (!isPrivate) {
			return isMyFollower ? '맞팔로우' : '팔로우';
		}
		if (isFollowRequestToPrivate) return '요청됨';
		return isMyFollower ? '맞팔로우' : '팔로우';
	};

	// 계정 조건에 따라 버튼 클릭 시 동작 변경
	const handleButtonClick = async () => {
		if (!user) return;

		try {
			if (isMyAccount) {
				navigate('/account/edit');
			} else if (isFollow) {
				await unfollowUser(user.username, accessToken);
			} else if (isPrivate) {
				if (isFollowRequestToPrivate) {
					await cancelRequestFollowToPrivateUser(user.username, accessToken);
				} else {
					await requestFollowToPrivateUser(user.username, accessToken);
				}
			} else {
				await followPublicUser(user.username, accessToken);
			}
		} catch {
			alert('Error occurred.');
		}
	};

	return (
		user && (
			<ProfileLayout>
				<HeaderContainer>
					{!isMyAccount && <Icon src={menu}>뒤로 가기</Icon>}
					{isMyAccountPrivate && <p>좌물쇠</p>}
					<h2>{id}</h2>
					<IconContainer isMyAccount={isMyAccount} isMyFollower={isMyFollower}>
						{isMyAccount && (
							<div>
								<Icon
									src={addPost}
									alt="게시글 추가"
									onClick={() => setAddPostModal('open')}
								/>
								<Icon
									src={menu}
									alt="메뉴"
									onClick={() => setMenuModal('open')}
								/>
							</div>
						)}
						{!isMyAccount && isMyFollower && (
							<div>
								<Icon
									src={menu}
									alt="팔로워 삭제"
									onClick={() => setFollowerModal('open')}
								/>
							</div>
						)}
					</IconContainer>
				</HeaderContainer>
				{/* 팔로우 요청 왔을 때에만 띄우기*/}
				{isFollowRequestToMe && (
					<FollowRequestContainer>
						<p>{user.username}님이 팔로우를 요청했습니다</p>
						<div>
							<button>확인</button>
							<button>삭제</button>
						</div>
					</FollowRequestContainer>
				)}
				<UserInfoContainer>
					<img src={defaultProfile} alt="프로필 사진" />
					<div>
						<h2>{user.postNumber}</h2>
						<p>게시물</p>
					</div>
					<div onClick={handleFollowersClick}>
						<h2>{user.followerNumber}</h2>
						<p>팔로워</p>
					</div>
					<div onClick={handleFollowingClick}>
						<h2>{user.followingNumber}</h2>
						<p>팔로잉</p>
					</div>
				</UserInfoContainer>
				<UserProfileContainer>
					<h3>{user.name}</h3>
					<p>{user.bio}</p>
					{/* 랑크 1개일 땐 바로 연결*/}
					{user.userLinks.length === 1 && (
						<a href={user.userLinks[0].link} target={'_blank'}>
							{user.userLinks[0].link}
						</a>
					)}
					{/* 랑크 2개 이상일 땐 모달 */}
					{user.userLinks.length > 1 && (
						<p
							className="links"
							onClick={() => {
								setLinkModal('open');
							}}
						>
							{user.userLinks[0].link} 외 {user.userLinks.length - 1}개
						</p>
					)}
				</UserProfileContainer>
				<ButtonContainer
					isMyAccount={isMyAccount}
					isFollow={isFollow}
					isPrivate={isPrivate}
					isFollowRequestToPrivate={isFollowRequestToPrivate}
				>
					<button onClick={handleButtonClick} className="leftButton">
						{getButtonLabel()}
					</button>
					<button className="rightButton">
						{isMyAccount ? '프로필 공유' : '메시지'}
					</button>
				</ButtonContainer>
				<PostContainer>
					<ToggleBar
						leftTab={<Icon src={menu} />}
						rightTab={<Icon src={addPost} />}
						activeTab={activeTab}
						setActiveTab={setActiveTab}
					>
						<div>포스트</div>
						<div>태그됨</div>
					</ToggleBar>
				</PostContainer>

				{/*	Modals */}
				{addPostModal !== 'closed' && (
					<AddPostModal
						close={() => {
							setAddPostModal('closing');
							setTimeout(() => setAddPostModal('closed'), 300);
						}}
						isClosing={addPostModal === 'closing'}
					/>
				)}
				{menuModal !== 'closed' && (
					<MenuModal
						close={() => {
							setMenuModal('closing');
							setTimeout(() => setMenuModal('closed'), 300);
						}}
						isClosing={menuModal === 'closing'}
					/>
				)}
				{followerModal !== 'closed' && (
					<FollowerModal
						close={() => {
							setFollowerModal('closing');
							setTimeout(() => setFollowerModal('closed'), 300);
						}}
						isClosing={followerModal === 'closing'}
					/>
				)}
				{linkModal !== 'closed' && (
					<LinkModal
						close={() => {
							setLinkModal('closing');
							setTimeout(() => setLinkModal('closed'), 300);
						}}
						isClosing={linkModal === 'closing'}
					/>
				)}
			</ProfileLayout>
		)
	);
}
