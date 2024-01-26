import { useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

import { getHomeFeed } from '../apis/post';
import Feed from '../components/Feed';
import Header from '../components/Post/Header';
import { FeedType } from '../types';

const HomeLayout = styled.main`
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

type FeedFetchStatus = 'pending' | 'complete' | 'fail';

type OptionType = {
	onScrollEnd?: () => void;
};

type ReturnType = {
	isEnd: boolean;
};

export default function Home() {
	const [feedData, setFeedData] = useState<FeedType>({
		posts: [],
		pageInfo: {
			page: 1,
			size: 0,
			offset: 0,
			hasNext: true,
			elements: 0,
		},
	});

	const [status, setStatus] = useState<FeedFetchStatus>('pending');

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
			if (status === 'pending' && feedData.pageInfo.hasNext) {
				try {
					const homeFeed = await getHomeFeed(feedData.pageInfo.page + 1);
					if (!homeFeed) {
						setStatus('fail');
						return;
					}

					setFeedData({
						posts: [...feedData.posts, ...homeFeed.posts],
						pageInfo: homeFeed.pageInfo,
					});
					setStatus('complete');
				} catch {
					navigate('/');
					setStatus('fail');
				}
			} else {
				setStatus('complete');
			}
		};

		fetchHomeFeedData();
	}, [
		feedData.pageInfo.hasNext,
		feedData.pageInfo.page,
		feedData.posts,
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
			<HomeLayout>
				<div className="story-post">
					<Feed posts={feedData.posts} />
				</div>
				{isEnd && <div>loading</div>}
			</HomeLayout>
		</>
	);
}
