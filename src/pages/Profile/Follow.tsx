import { useEffect, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import styled from 'styled-components';

import {
	getUserInformation,
	getFollowerCommon,
	getFollowerDiff,
	getFollowingCommon,
	getFollowingDiff,
	getUserFollowStatus,
} from '../../apis/user.ts';
import MiniProfile from '../../components/MiniProfile.tsx';
import ToggleBar from '../../components/Profile/ToggleBar.tsx';
import { useUserContext } from '../../contexts/UserContext.tsx';
import BackHeader from '../../shared/Header/BackHeader.tsx';
import SearchBar from '../../shared/SearchBar.tsx';
import { MiniProfileWithIsRequestType, UserType } from '../../types.ts';

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

	// 탭 관리
	const [activeTab, setActiveTab] = useState<'left' | 'right'>('left');

	// 검색 관리
	const [followerSearch, setFollowerSearch] = useState<string>('');
	const [followingSearch, setFollowingSearch] = useState<string>('');

	const [followerNum, setFollowerNum] = useState(0);
	const [followingNum, setFollowingNum] = useState(0);

	// 팔로워, 팔로잉 목록
	const [followerCommonList, setFollowerCommonList] = useState<
		MiniProfileWithIsRequestType[]
	>([]);
	const [followerDiffList, setFollowerDiffList] = useState<
		MiniProfileWithIsRequestType[]
	>([]);
	const [followingCommonList, setFollowingCommonList] = useState<
		MiniProfileWithIsRequestType[]
	>([]);
	const [followingDiffList, setFollowingDiffList] = useState<
		MiniProfileWithIsRequestType[]
	>([]);

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
			setFollowerNum(userInfo.followerNumber);
			setFollowingNum(userInfo.followingNumber);

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

			setFollowerCommonList(followers);
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

			setFollowerDiffList(followers);
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

			setFollowingCommonList(followings);
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

			setFollowingDiffList(followings);
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

	const handleFollowingSearch = (username: string, name: string) => {
		if (followingSearch === '') return true;

		return (
			username
				.toLowerCase()
				.replace(/\s+/g, '')
				.includes(followingSearch.toLowerCase().replace(/\s+/g, '')) ||
			name
				.toLowerCase()
				.replace(/\s+/g, '')
				.includes(followingSearch.toLowerCase().replace(/\s+/g, ''))
		);
	};

	const handleFollowerSearch = (username: string, name: string) => {
		if (followerSearch === '') return true;

		return (
			username
				.toLowerCase()
				.replace(/\s+/g, '')
				.includes(followerSearch.toLowerCase().replace(/\s+/g, '')) ||
			name
				.toLowerCase()
				.replace(/\s+/g, '')
				.includes(followerSearch.toLowerCase().replace(/\s+/g, ''))
		);
	};

	const handleFollow = () => {
		setFollowingNum(followingNum + 1);
	};

	const handleUnFollow = () => {
		setFollowingNum(followingNum - 1);
	};

	const handleDeleteFollwer = () => {
		setFollowerNum(followerNum - 1);
	};

	if (isLoading) return <></>;
	return (
		user && (
			<FollowLayout>
				<BackHeader title={user.username} backURL={`/${username}`} />
				<FollowContainer>
					<ToggleBar
						leftTab={`팔로워 ${followerNum}명`}
						rightTab={`팔로잉 ${followingNum}명`}
						activeTab={activeTab}
						setActiveTab={handleTabChange}
					>
						{/* 팔로워 */}
						<FollowList>
							{/* 검색 창*/}
							<SearchBar
								text={followerSearch}
								onChangeSearch={setFollowerSearch}
							/>
							{/* 유저 본인 */}
							{isMyAccount ? (
								<>
									{/* 내 팔로워 */}
									{followerCommonList
										.filter((list) => {
											return handleFollowerSearch(list.username, list.name);
										})
										.map((follower) => (
											<MiniProfile
												key={follower.userId}
												user={follower}
												action="삭제"
												handleDeleteFollower={handleDeleteFollwer}
											/>
										))}
									{followerDiffList
										.filter((list) => {
											return handleFollowerSearch(list.username, list.name);
										})
										.map((follower) => (
											<MiniProfile
												key={follower.userId}
												user={follower}
												action="삭제"
												handleDeleteFollower={handleDeleteFollwer}
											/>
										))}
								</>
							) : (
								<>
									{/* 다른 유저 */}
									{/* 다른 유저의 팔로워 중 나 */}
									{isFollow && handleFollowerSearch(username, name) && (
										<MiniProfile
											key={userId}
											user={{
												userId,
												username,
												name,
												profileImageUrl,
											}}
											action="hideButton"
										/>
									)}
									{/* 다른 유저의 팔로워 중 내가 팔로잉 하는 사람들 */}
									{followerCommonList
										.filter((list) => {
											return handleFollowerSearch(list.username, list.name);
										})
										.map((follower) => (
											<MiniProfile
												key={follower.userId}
												user={follower}
												action="팔로잉"
											/>
										))}
									{/* 다른 유저의 팔로워 중 내가 팔로잉 하지 않는 사람들, 자신은 제외 */}
									{followerDiffList
										.filter((list) => {
											return handleFollowerSearch(list.username, list.name);
										})
										.map(
											(follower) =>
												username !== follower.username && (
													<MiniProfile
														key={follower.userId}
														user={follower}
														action={follower.isRequest ? '요청됨' : '팔로우'}
													/>
												)
										)}
								</>
							)}
						</FollowList>

						{/* 팔로잉 */}
						<FollowList>
							{/* 검색 창*/}
							<SearchBar
								text={followingSearch}
								onChangeSearch={setFollowingSearch}
							/>
							{/* 유저 본인 */}
							{!isMyAccount &&
								isFollow &&
								handleFollowingSearch(username, name) && (
									<MiniProfile
										key={userId}
										user={{
											userId,
											username,
											name,
											profileImageUrl,
										}}
										action="hidden"
									/>
								)}
							{/* 팔로잉 중 내가 팔로잉 하는 사람들 */}
							{followingCommonList
								.filter((list) => {
									return handleFollowingSearch(list.username, list.name);
								})
								.map((following) => (
									<MiniProfile
										key={following.userId}
										user={following}
										action="팔로잉"
										handleFollow={handleFollow}
										handleUnFollow={handleUnFollow}
									/>
								))}
							{/* 팔로잉 중 내가 팔로잉 하지 않는 사람들, 자신은 제외 */}
							{followingDiffList
								.filter((list) => {
									return handleFollowingSearch(list.username, list.name);
								})
								.map(
									(following) =>
										username !== following.username && (
											<MiniProfile
												key={following.userId}
												user={following}
												action={following.isRequest ? '요청됨' : '팔로우'}
												handleFollow={handleFollow}
												handleUnFollow={handleUnFollow}
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
