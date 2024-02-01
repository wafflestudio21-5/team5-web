import styled from 'styled-components';

import { useUserContext } from '../../contexts/UserContext.tsx';
import BackHeader from '../../shared/BackHeader.tsx';

const SavedLayout = styled.div`
	width: 100%;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
`;

const PostContainer = styled.div`
	width: 100%;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
`;

export default function Saved() {
	const { username } = useUserContext();

	return (
		<SavedLayout>
			<BackHeader title="저장됨" backURL={`/${username}`} />
			<PostContainer>{/*추가 예정*/}</PostContainer>
		</SavedLayout>
	);
}
