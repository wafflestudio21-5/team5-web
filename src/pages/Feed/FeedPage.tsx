import { useState, useCallback, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import styled from 'styled-components';

import { getFeedData } from '../../apis/post';
import Feed from '../../components/Feed';
import Header from '../../components/Post/Header';
import { useUserContext } from '../../contexts/UserContext';
import { FeedType } from '../../types';

type FeedFetchStatus = 'pending' | 'complete' | 'fail';

type OptionType = {
	onScrollEnd?: () => void;
};

type ReturnType = {
	isEnd: boolean;
};

const Layout = styled.main`
	width: 100%;
	display: flex;
	flex-direction: row;
	overflow-y: hidden;
	margin-top: 1rem;
	justify-content: center;
	padding: 0;
	& .story-post {
		width: 100%;
		display: flex;
		flex-direction: column;
	}
`;

export default function FeedPage() {
	const { id } = useParams();

	const [feedData, setFeedData] = useState<FeedType>({
		posts: [],
		pageInfo: {
			page: 0,
			size: 0,
			offset: 0,
			hasNext: true,
			elements: 0,
		},
	});

	const [status, setStatus] = useState<FeedFetchStatus>('pending');
	const { accessToken } = useUserContext();

	const navigate = useNavigate();

	const lockScroll = useCallback(() => {
		document.body.style.overflow = 'hidden';
	}, []);

	const unlockScroll = useCallback(() => {
		document.body.style.overflow = '';
	}, []);

	const useInfiniteScroll = ({ onScrollEnd }: OptionType): ReturnType => {
		const [isEnd, setIsEnd] = useState(false);

		const handleScroll = async () => {
			const scrollHeight = document.documentElement.scrollHeight;
			const scrollTop = document.documentElement.scrollTop;
			const clientHeight = document.documentElement.clientHeight;

			if (scrollTop + clientHeight >= scrollHeight) {
				setIsEnd(true);
				lockScroll();
				if (onScrollEnd) await onScrollEnd();
				await unlockScroll();
				await setIsEnd(false);
			}
		};

		useEffect(() => {
			window.addEventListener('scroll', handleScroll);
			return () => window.removeEventListener('scroll', handleScroll);
		}, []);

		return { isEnd };
	};

	useEffect(() => {
		const fetchHomeFeedData = async () => {
			if (id && status === 'pending' && feedData.pageInfo.hasNext) {
				try {
					const feed = await getFeedData(
						feedData.pageInfo.page + 1,
						accessToken,
						Number(id)
					);
					if (!feed) {
						setStatus('fail');
						return;
					}

					setFeedData({
						posts: [...feedData.posts, ...feed.posts],
						pageInfo: feed.pageInfo,
					});
					setStatus('complete');
				} catch {
					setStatus('fail');
				}
			} else {
				setStatus('complete');
			}
		};

		fetchHomeFeedData();
	}, [
		accessToken,
		feedData.pageInfo.hasNext,
		feedData.pageInfo.page,
		feedData.posts,
		id,
		navigate,
		status,
	]);

	const { isEnd } = useInfiniteScroll({
		onScrollEnd: () => {
			setStatus('pending');
		},
	});

	return (
		<>
			<Header />
			<Layout>
				<div className="story-post">
					<Feed posts={feedData.posts} />
				</div>
				{isEnd && <div>loading</div>}
			</Layout>
		</>
	);
}
