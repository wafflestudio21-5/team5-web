import { useEffect, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import styled from 'styled-components';

import { getUserInformation } from '../../apis/user.ts';
import back from '../../assets/Images/Profile/back.png';
import ToggleBar from '../../components/Profile/ToggleBar.tsx';
import { useUserContext } from '../../contexts/UserContext.tsx';
import Icon from '../../shared/Icon.tsx';
import SearchBar from '../../shared/SearchBar.tsx';
import { UserType } from '../../types.ts';

const FollowLayout = styled.main`
	width: 100%;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
`;

const HeaderContainer = styled.div`
	width: 95%;
	display: flex;
	flex-direction: row;
	justify-content: space-between;
	align-items: center;
	margin-bottom: 2.5rem;

	& h2 {
		margin: 0 auto 0 2rem;
	}
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
	const navigate = useNavigate();
	const location = useLocation();
	const { accessToken } = useUserContext();
	const { id } = useParams();
	const [activeTab, setActiveTab] = useState<'left' | 'right'>('left');
	const [user, setUser] = useState<UserType | null>(null);

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
			} catch {
				navigate('/');
			}
		};
		fetchUserData();

		const active = location.pathname.includes('/followers') ? 'left' : 'right';
		setActiveTab(active);
	}, [id, location, navigate, accessToken]);

	const handleTabChange = (tab: 'left' | 'right') => {
		setActiveTab(tab);
		const newPath = tab === 'left' ? `${id}/followers` : `${id}/following`;
		navigate(newPath);
	};

	return (
		user && (
			<FollowLayout>
				<HeaderContainer>
					<Icon src={back} alt="취소" onClick={() => navigate(`/${id}`)} />
					<h2>{user.name}</h2>
				</HeaderContainer>
				<FollowContainer>
					<ToggleBar
						leftTab={`팔로워 ${user.followerNumber}명`}
						rightTab={`팔로잉 ${user.followingNumber}명`}
						activeTab={activeTab}
						setActiveTab={handleTabChange}
					>
						<FollowList>
							<SearchBar />
							팔로워 목록
						</FollowList>
						<FollowList>
							<SearchBar />
							팔로잉 목록
						</FollowList>
					</ToggleBar>
				</FollowContainer>
			</FollowLayout>
		)
	);
}
