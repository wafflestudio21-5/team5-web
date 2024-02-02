import { useEffect, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import styled from 'styled-components';

import {
	getUserInformation,
	getFollowerCommon,
	getFollowerDiff,
	getFollowingCommon,
	getFollowingDiff,
	deleteFollower,
	unfollowUser,
	getUserFollowStatus,
	getUserFollowMeStatus,
	followPublicUser,
} from '../../apis/user.ts';
import MiniProfile from '../../components/MiniProfile.tsx';
import ToggleBar from '../../components/Profile/ToggleBar.tsx';
import { useUserContext } from '../../contexts/UserContext.tsx';
import BackHeader from '../../shared/BackHeader.tsx';
/* import SearchBar from '../../shared/SearchBar.tsx';
 */ import { MiniProfileType, UserType } from '../../types.ts';

const FollowLayout = styled.main`
	width: 100%;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
`;

const FollowContainer = styled.div`
	width: 100%;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
`;

const FollowList = styled.div`
	width: 100%;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	padding-top: 1rem;
`;

export default function Follow() {
	// 페이지 로딩
	const [isLoading, setIsLoading] = useState<boolean>(true);

	// 페이지 URL 관리
	const navigate = useNavigate();
	const location = useLocation();

	// id로 유저 정보 가져오기
	const { accessToken, userId, username, name, profileImageUrl } =
		useUserContext();
	const { id } = useParams();

	// 현재 페이지의 유저 정보
	const [user, setUser] = useState<UserType | null>(null);
	const [isMyAccount, setIsMyAccount] = useState<boolean | null>(null);
	const [isFollow, setIsFollow] = useState<boolean | null>(null);
	const [isMyFollower, setIsMyFollower] = useState<boolean | null>(null);

	// 탭 관리
	const [activeTab, setActiveTab] = useState<'left' | 'right'>('left');

	// 팔로워, 팔로잉 목록
	const [followerCommonList, setFollowerCommonList] = useState<
		MiniProfileType[]
	>([]);
	const [followerDiffList, setFollowerDiffList] = useState<MiniProfileType[]>(
		[]
	);
	const [followingCommonList, setFollowingCommonList] = useState<
		MiniProfileType[]
	>([]);
	const [followingDiffList, setFollowingDiffList] = useState<MiniProfileType[]>(
		[]
	);

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
			} else {
				// 내가 팔로잉 하는지 판단
				const followStatus = await getUserFollowStatus(
					userInfo.username,
					accessToken
				);
				if (followStatus) {
					setIsFollow(true);
				}

				// 나를 팔로잉 하는지 판단
				const followerStatus = await getUserFollowMeStatus(
					userInfo.username,
					accessToken
				);
				if (followerStatus) {
					setIsMyFollower(true);
				}
			}
		} catch {
			alert('유저 정보를 가져오는 데 실패했습니다.');
		}
	};

	const fetchFollowerCommonList = async () => {
		if (!user) {
			navigate('/');
			return;
		}

		try {
			const followers = await getFollowerCommon(user.username, accessToken);
			if (!followers) {
				navigate('/');
				return;
			}

			setFollowerCommonList(followers.miniProfiles);
		} catch {
			navigate('/');
		}
	};

	const fetchFollowerDiffList = async () => {
		if (!user) {
			navigate('/');
			return;
		}

		try {
			const followers = await getFollowerDiff(user.username, accessToken);
			if (!followers) {
				navigate('/');
				return;
			}

			setFollowerDiffList(followers.miniProfiles);
		} catch {
			navigate('/');
		}
	};

	const fetchFollowingCommonList = async () => {
		if (!user) {
			navigate('/');
			return;
		}

		try {
			const followings = await getFollowingCommon(user.username, accessToken);
			if (!followings) {
				navigate('/');
				return;
			}

			setFollowingCommonList(followings.miniProfiles);
		} catch {
			navigate('/');
		}
	};

	const fetchFollowingDiffList = async () => {
		if (!user) {
			navigate('/');
			return;
		}

		try {
			const followings = await getFollowingDiff(user.username, accessToken);
			if (!followings) {
				navigate('/');
				return;
			}

			setFollowingDiffList(followings.miniProfiles);
		} catch {
			navigate('/');
		}
	};

	useEffect(() => {
		setIsLoading(true);
		fetchUserData();
		setActiveTab(location.pathname.includes('followers') ? 'left' : 'right');
	}, [id]);

	useEffect(() => {
		console.log('123');
		const fetchDataLists = async () => {
			if (!user) return;

			try {
				if (activeTab === 'left') {
					await fetchFollowerCommonList();
					await fetchFollowerDiffList();
				} else {
					await fetchFollowingCommonList();
					await fetchFollowingDiffList();
				}
			} catch {
				navigate('/');
			} finally {
				setIsLoading(false);
			}
		};

		fetchDataLists();
	}, [id, user, activeTab]);

	const handleTabChange = (tab: 'left' | 'right') => {
		setActiveTab(tab);
		const newPath = tab === 'left' ? `/${id}/followers` : `/${id}/following`;
		navigate(newPath);
	};

	if (isLoading) return <div></div>;
	return (
		user && (
			<FollowLayout>
				<BackHeader title={user.username} backURL={`/${username}`} />
				<FollowContainer>
					<ToggleBar
						leftTab={`팔로워 ${user.followerNumber}명`}
						rightTab={`팔로잉 ${user.followingNumber}명`}
						activeTab={activeTab}
						setActiveTab={handleTabChange}
					>
						{/* 팔로워 */}
						<FollowList>
							{/* 검색 창*/}
							{/* 							<SearchBar />
							 */}{' '}
							{isMyAccount ? (
								<>
									{/* 내가 팔로잉 하는 사람들 */}
									{followerCommonList.map((follower) => (
										<MiniProfile
											key={follower.userId}
											user={follower}
											buttonLabel="삭제"
											onClickButton={() =>
												deleteFollower(follower.username, accessToken)
											}
										/>
									))}
									{/* 내가 팔로잉 하지 않는 사람들, 자신은 제외 */}
									{followerDiffList.map(
										(follower) =>
											username !== follower.username && (
												<MiniProfile
													key={follower.userId}
													user={follower}
													buttonLabel="삭제"
													onClickButton={() =>
														deleteFollower(follower.username, accessToken)
													}
												/>
											)
									)}
								</>
							) : (
								<>
									{/* 유저 본인 */}
									{!isMyAccount && isFollow && (
										<MiniProfile
											key={userId}
											user={{
												userId,
												username,
												name,
												profileImageUrl,
											}}
											buttonLabel="hidden"
											onClickButton={() => {}}
										/>
									)}
									{/* 내가 팔로잉 하는 사람들 */}
									{followerCommonList.map((follower) => (
										<MiniProfile
											key={follower.userId}
											user={follower}
											buttonLabel="팔로잉"
											onClickButton={() =>
												deleteFollower(follower.username, accessToken)
											}
										/>
									))}
									{/* 내가 팔로잉 하지 않는 사람들, 자신은 제외 */}
									{followerDiffList.map(
										(follower) =>
											username !== follower.username && (
												<MiniProfile
													key={follower.userId}
													user={follower}
													buttonLabel="팔로우"
													onClickButton={() =>
														followPublicUser(follower.username, accessToken)
													}
												/>
											)
									)}
								</>
							)}
						</FollowList>

						{/* 팔로잉 */}
						<FollowList>
							{/* 검색 창*/}
							{/* 							<SearchBar />
							 */}{' '}
							{/* 유저 본인 */}
							{!isMyAccount && isMyFollower && (
								<MiniProfile
									key={userId}
									user={{
										userId,
										username,
										name,
										profileImageUrl,
									}}
									buttonLabel="hidden"
									onClickButton={() => {}}
								/>
							)}
							{/* 내가 팔로잉 하는 사람들 */}
							{followingCommonList.map((following) => (
								<MiniProfile
									key={following.userId}
									user={following}
									buttonLabel="팔로잉"
									onClickButton={() =>
										unfollowUser(following.username, accessToken)
									}
								/>
							))}
							{/* 내가 팔로잉 하지 않는 사람들, 자신은 제외 */}
							{followingDiffList.map(
								(following) =>
									username !== following.username && (
										<MiniProfile
											key={following.userId}
											user={following}
											buttonLabel="팔로우"
											onClickButton={() =>
												followPublicUser(following.username, accessToken)
											}
										/>
									)
							)}
						</FollowList>
					</ToggleBar>
				</FollowContainer>
			</FollowLayout>
		)
	);
}
