import { useEffect, useState } from 'react';
import styled from 'styled-components';

import { getFollowRequestList } from '../../apis/user.ts';
import MiniProfile from '../../components/MiniProfile.tsx';
import { useUserContext } from '../../contexts/UserContext.tsx';
import BackHeader from '../../shared/BackHeader.tsx';
import { MiniProfileType } from '../../types.ts';

const NotificationLayout = styled.main`
	width: 100%;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
`;

const NotificationContainer = styled.div`
	width: 100%;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
`;

export default function Notification() {
	const { accessToken, isMyAccountPrivate } = useUserContext();

	const [isLoading, setIsLoading] = useState<boolean>(true);
	const [followRequestList, setFollowRequestList] = useState<MiniProfileType[]>(
		[]
	);

	const fetchFollowRequestList = async () => {
		if (isMyAccountPrivate) {
			const data = await getFollowRequestList(accessToken);
			if (data) {
				setFollowRequestList(data);
			}
		}
		setIsLoading(false);
	};

	useEffect(() => {
		setIsLoading(true);
		fetchFollowRequestList();
	}, []);

	if (isLoading) return <></>;
	return (
		<NotificationLayout>
			<BackHeader title="팔로우 요청" backURL="/" />
			<NotificationContainer>
				{followRequestList &&
					followRequestList.length > 0 &&
					followRequestList.map((user) => (
						<MiniProfile key={user.userId} user={user} text="알림" />
					))}
			</NotificationContainer>
		</NotificationLayout>
	);
}
