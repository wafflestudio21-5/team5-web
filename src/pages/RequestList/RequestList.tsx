import { useEffect, useState } from 'react';
import styled from 'styled-components';

import MiniProfile from '../../components/MiniProfile';
import { useUserContext } from '../../contexts/UserContext';
import { MiniProfileType } from '../../types';

const ListContainer = styled.ul`
	display: flex;
	flex-direction: column;
`;

export default function RequestList() {
	const [requestList, setRequestList] = useState<MiniProfileType[]>([]);

	const { accessToken } = useUserContext();

	useEffect(() => {
		const fetchRequestListData = async () => {
			try {
				return;
			} catch (error) {
				return;
			}
		};

		fetchRequestListData();
	}, []);

	return (
		<ListContainer>
			{requestList.map((request) => (
				<MiniProfile
					user={request}
					buttonLabel="확인"
					onClickButton={() => {}}
				/>
			))}
		</ListContainer>
	);
}
