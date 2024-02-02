import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import { getUserFeed } from '../../apis/user.ts';
import Feed from '../../components/Feed.tsx';
import { useUserContext } from '../../contexts/UserContext.tsx';
import { PostType } from '../../types.ts';

export default function UserFeed() {
	const { id } = useParams();
	const { accessToken } = useUserContext();

	const [isLoading, setIsLoading] = useState(true);
	const [feedData, setFeedData] = useState<PostType[]>([]);

	const fetchUserFeed = async () => {
		if (id !== undefined) {
			const data = await getUserFeed(id, accessToken);
			if (data) setFeedData(data);
			setIsLoading(false);
		}
	};

	useEffect(() => {
		setIsLoading(true);
		setFeedData([]);

		fetchUserFeed();
	}, []);

	if (isLoading) return <></>;
	return (
		<>
			<Feed posts={feedData} />
		</>
	);
}
