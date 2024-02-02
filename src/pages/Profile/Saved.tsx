/* import { useEffect } from 'react';
 */ import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

/* import { resetAccessToken } from '../../apis/login.ts';
 */ import { getSavedPreview } from '../../apis/user.ts';
import back from '../../assets/Images/Profile/back.png';
import PostList from '../../components/Post/PostList.tsx';
import { useUserContext } from '../../contexts/UserContext.tsx';
import Icon from '../../shared/Icon.tsx';
import { PreviewType } from '../../types.ts';

const SavedLayout = styled.div`
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

const PostContainer = styled.div`
	width: 100%;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
`;

export default function Saved() {
	const navigate = useNavigate();
	const { username, accessToken } = useUserContext();

	const [previews, setPreviews] = useState<PreviewType[]>([]);

	useEffect(() => {
		const fetchPreviews = async () => {
			const result = await getSavedPreview(accessToken);
			if (result) setPreviews(result);
		};

		fetchPreviews();
	});

	return (
		<SavedLayout>
			<HeaderContainer>
				<Icon src={back} alt="취소" onClick={() => navigate(`/${username}`)} />
				<h2>저장됨</h2>
			</HeaderContainer>
			<PostContainer>
				<PostList
					previews={previews}
					callbackUrl={'/' + username + '/saved/feed'}
					useHashtag={true}
				/>
			</PostContainer>
		</SavedLayout>
	);
}
