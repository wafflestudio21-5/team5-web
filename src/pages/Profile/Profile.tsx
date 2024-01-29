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
import back from '../../assets/Images/Profile/back.png';
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
	position: relative;
	width: 100%;
	display: flex;
	flex-direction: row;
	align-items: center;
	margin-bottom: 1.5rem;

	// 좌측 상단의 뒤로가기 아이콘
	& .back {
		margin-left: 1rem;

		&:hover {
			cursor: pointer;
		}
	}

	& h2 {
		margin: 0 1rem;
	}

	// 우측 상단의 아이콘 컨테이너 정렬
	& div {
		position: absolute;
		right: 0;
	}
`;

// 내 프로필 페이지 or 내 팔로워 아니면 우측 상단 아이콘 숨기기
const IconContainer = styled.div`
	display: flex;
	flex-direction: row;
	justify-content: center;
	align-items: center;

	& img {
		margin-right: 1rem;

		&:hover {
			cursor: pointer;
		}
	}
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

const ButtonContainer = styled.div`
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

	& .grey {
		background-color: ${getColor('extraLightGrey')};
		color: ${getColor('black')};
	}

	& .grey-bold {
		background-color: ${getColor('extraLightGrey')};
		color: ${getColor('black')};
		font-weight: 700;
	}

	& .grey-big {
		width: 95%;
		background-color: ${getColor('extraLightGrey')};
		color: ${getColor('black')};
		font-weight: 700;
	}

	& .blue {
		background-color: ${getColor('blue')};
		color: ${getColor('white')};
		font-weight: 700;
	}

	& .blue-big {
		width: 95%;
		background-color: ${getColor('blue')};
		color: ${getColor('white')};
		font-weight: 700;
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
	// 페이지 로딩
	const [isLoading, setIsLoading] = useState(true);

	// 페이지 이동
	const navigate = useNavigate();

	// ToggleBar 탭 상태 관리
	const [activeTab, setActiveTab] = useState<'left' | 'right'>('left');

	// 모달 관련
	const [addPostModal, setAddPostModal] = useState<modalStateType>('closed');
	const [menuModal, setMenuModal] = useState<modalStateType>('closed');
	const [followerModal, setFollowerModal] = useState<modalStateType>('closed');
	const [linkModal, setLinkModal] = useState<modalStateType>('closed');

	// id로 유저 정보 가져오기
	const { id } = useParams();
	const { username, accessToken, isMyAccountPrivate } = useUserContext();

	// 프로필 페이지의 유저 정보
	const [user, setUser] = useState<UserType | null>();
	const [isMyAccount, setIsMyAccount] = useState<boolean | null>(null);
	const [isFollow, setIsFollow] = useState<boolean | null>(null);
	const [isOpen, setIsOpen] = useState<boolean | null>(null);
	const [isFollowRequestToPrivate, setIsFollowRequestToPrivate] = useState<
		boolean | null
	>(null);
	const [isMyFollower, setIsMyFollower] = useState<boolean | null>(null); // 독립적
	const [isFollowRequestToMe, setIsFollowRequestToMe] = useState<
		boolean | null
	>(null); // 내가 비공개일 때 나에게 팔로우 요청을 보냈는지 확인

	const fetchUserData = async () => {
		try {
			if (!id) {
				navigate('/');
				return;
			}

			// params로 유저 정보 가져오기
			const userInfo = await getUserInformation(id, accessToken);
			if (!userInfo) {
				navigate('/');
				return;
			}
			setUser(userInfo);

			// 내 계정인지 판단
			if (userInfo.username === username) {
				setIsMyAccount(true);
				return;
			}

			// 내 팔로워인지 판단
			const followMeStatus = await getUserFollowMeStatus(
				userInfo.username,
				accessToken
			);
			if (followMeStatus) {
				setIsMyFollower(true);
			} else {
				setIsMyFollower(false);

				// 내 팔로워가 아니라면 내가 비공개 계정일 때 나에게 팔로우 요청을 보냈는지 판단
				if (isMyAccountPrivate) {
					const followRequestToMeStatus = await getFollowRequestToMeStatus(
						userInfo.username,
						accessToken
					);
					if (followRequestToMeStatus) {
						setIsFollowRequestToMe(true);
					} else {
						setIsFollowRequestToMe(false);
					}
				}
			}

			// 내가 팔로잉 하는지 판단
			const followStatus = await getUserFollowStatus(
				userInfo.username,
				accessToken
			);
			if (followStatus) {
				setIsFollow(true);
			}

			// 공개 계정인지 판단
			if (!userInfo.isPrivate) {
				setIsOpen(true);
			} else {
				// 비공개라면 팔로우 요청 여부 판단
				const followRequestStatus = await getFollowRequestStatus(
					userInfo.username,
					accessToken
				);
				if (followRequestStatus) {
					setIsFollowRequestToPrivate(true);
				}
			}
		} catch {
			alert('유저 정보를 가져오는 데 실패했습니다.');
		}
	};

	const initialFetchUserData = async () => {
		setIsLoading(true);
		await fetchUserData();
		setIsLoading(false);
	};

	useEffect(() => {
		initialFetchUserData();
	}, [id, navigate]);

	// 계정 공개 여부에 따라 팔로워, 팔로잉 버튼 클릭 여부 결정
	const handleFollowersClick = () => {
		if (isOpen) {
			navigate(`/${id}/followers`);
		}
	};
	const handleFollowingClick = () => {
		if (isOpen) {
			navigate(`/${id}/following`);
		}
	};

	// 프로필 편집으로 이동
	const onClickEditProfile = () => {
		navigate('/account/edit');
	};

	// 언팔로우
	const onClickUnfollow = async () => {
		if (!user) return;

		setIsFollow(false);

		try {
			const unfollowResult = await unfollowUser(user.username, accessToken);
			if (unfollowResult) {
				await fetchUserData();
			} else {
				setIsFollow(true);
			}
		} catch {
			setIsFollow(true);
		}
	};

	// 공개 유저를 팔로우
	const onClickFollow = async () => {
		if (!user) return;

		setIsFollow(true);

		try {
			const followResult = await followPublicUser(user.username, accessToken);
			if (followResult) {
				setIsFollow(false);
			} else {
				await fetchUserData();
			}
		} catch {
			setIsFollow(false);
		}
	};

	// 팔로우 요청 보내기
	const onClickRequestFollow = async () => {
		if (!user) return;

		setIsFollowRequestToPrivate(true);

		try {
			const followResult = await requestFollowToPrivateUser(
				user.username,
				accessToken
			);
			if (followResult) {
				await fetchUserData();
			} else {
				setIsFollowRequestToPrivate(false);
			}
		} catch {
			setIsFollowRequestToPrivate(false);
		}
	};

	// 팔로우 요청 취소
	const onClickCancelRequestFollow = async () => {
		if (!user) return;

		setIsFollowRequestToPrivate(false);

		try {
			const followResult = await cancelRequestFollowToPrivateUser(
				user.username,
				accessToken
			);
			if (followResult) {
				await fetchUserData();
			} else {
				setIsFollowRequestToPrivate(true);
			}
		} catch {
			setIsFollowRequestToPrivate(true);
		}
	};

	if (isLoading) return <div></div>;
	return (
		user && (
			<ProfileLayout>
				{/* 헤더 */}
				<HeaderContainer>
					{!isMyAccount && <Icon src={back} className="back" />}
					{isMyAccountPrivate && <p>좌물쇠</p>}
					<h2>{id}</h2>
					{isMyAccount ? (
						<IconContainer>
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
						</IconContainer>
					) : (
						<IconContainer>
							<Icon
								src={menu}
								alt="팔로워 삭제"
								onClick={() => setFollowerModal('open')}
							/>
						</IconContainer>
					)}
				</HeaderContainer>

				{/* 팔로우 요청 왔을 때에만 띄우는 수락 거절 창 */}
				{isFollowRequestToMe && (
					<FollowRequestContainer>
						<p>{user.username}님이 팔로우를 요청했습니다</p>
						<div>
							<button>확인</button>
							<button>삭제</button>
						</div>
					</FollowRequestContainer>
				)}

				{/* 프로필 사진, 게시물, 팔로워, 팔로잉 */}
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

				{/* 이름, 소개, 링크 */}
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

				{/* 유저 상태에 따른 버튼 */}
				<ButtonContainer>
					{/* 내 계정일 경우 */}
					{isMyAccount ? (
						<>
							<button className="grey" onClick={onClickEditProfile}>
								프로필 편집
							</button>
							<button className="grey">프로필 공유</button>
						</>
					) : (
						<>
							{/* 팔로잉 중인 남의 계정 */}
							{isFollow ? (
								<>
									<button className="grey-bold" onClick={onClickUnfollow}>
										팔로잉
									</button>
									<button className="grey">메시지</button>
								</>
							) : (
								<>
									{/* 공개 계정 */}
									{isOpen ? (
										<>
											<button className="blue" onClick={onClickFollow}>
												{isMyFollower ? '맞팔로우' : '팔로우'}
											</button>
											<button className="grey">메시지</button>
										</>
									) : (
										<>
											{/* 비공개 계정 */}
											{isFollowRequestToPrivate ? (
												<button
													className="grey-big"
													onClick={onClickCancelRequestFollow}
												>
													요청됨
												</button>
											) : (
												<button
													className="blue-big"
													onClick={onClickRequestFollow}
												>
													팔로우
												</button>
											)}
										</>
									)}
								</>
							)}
						</>
					)}
				</ButtonContainer>

				{/* 포스트, 태그된 포스트 토글 바*/}
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
