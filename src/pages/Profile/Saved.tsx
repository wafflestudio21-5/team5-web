import { useEffect, useState } from 'react';
import styled from 'styled-components';

import { getSavedPreview } from '../../apis/user.ts';
import PostList from '../../components/Post/PostList.tsx';
import { useUserContext } from '../../contexts/UserContext.tsx';
import BackHeader from '../../shared/Header/BackHeader.tsx';
import { PreviewType } from '../../types.ts';

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
	const { username, accessToken } = useUserContext();

	const [previews, setPreviews] = useState<PreviewType[]>([]);

	useEffect(() => {
		const fetchPreviews = async () => {
			const result = await getSavedPreview(accessToken);
			if (result) setPreviews(result);
		};

		fetchPreviews();
	}, []);

	return (
		<SavedLayout>
			<BackHeader title="저장됨" backURL={`/${username}`} />
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
