import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import { getSavedFeed } from '../../apis/user.ts';
import Feed from '../../components/Feed.tsx';
import { useUserContext } from '../../contexts/UserContext.tsx';
import { PostType } from '../../types.ts';

export default function SavedFeed() {
	const { id } = useParams();
	const { accessToken } = useUserContext();

	const [isLoading, setIsLoading] = useState(true);
	const [feedData, setFeedData] = useState<PostType[]>([]);

	const fetchSavedFeed = async () => {
		if (id !== undefined) {
			const data = await getSavedFeed(accessToken);
			if (data) setFeedData(data);
			setIsLoading(false);
		}
	};

	useEffect(() => {
		setIsLoading(true);
		setFeedData([]);

		fetchSavedFeed();
	}, []);

	if (isLoading) return <></>;
	return (
		<>
			<Feed posts={feedData} />
		</>
	);
}
