import { useState, useCallback, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import styled from 'styled-components';

import { getExploreFeed } from '../../apis/explore';
import Feed from '../../components/Feed';
import { useUserContext } from '../../contexts/UserContext';
import BackHeader from '../../shared/Header/BackHeader.tsx';
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
`;

export default function ExploreFeed() {
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

	const { category, id } = useParams();

	const [status, setStatus] = useState<FeedFetchStatus>(`pending`);
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
		const fetchExploreFeedData = async () => {
			if (
				id !== undefined &&
				status === 'pending' &&
				feedData.pageInfo.hasNext
			) {
				try {
					const homeFeed = await getExploreFeed(
						Number(id),
						feedData.pageInfo.page + 1,
						accessToken
					);
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
					setStatus('fail');
				}
			} else {
				setStatus('complete');
			}
		};

		fetchExploreFeedData();
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

	if (
		category === undefined ||
		id === undefined ||
		!Number.isInteger(Number(id))
	)
		return <></>;

	return (
		<>
			<BackHeader backURL={'/explore/' + category} title={category} />
			<Layout>
				<div className="story-post">
					<Feed posts={feedData.posts} />
				</div>
				{isEnd && <div>loading</div>}
			</Layout>
		</>
	);
}
