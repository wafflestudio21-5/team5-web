import { useCallback, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { CategoryMap, getCategoryExplore } from '../../apis/explore';
import Header from '../../components/Post/Header';
import PostList from '../../components/Post/PostList';
import { useUserContext } from '../../contexts/UserContext';
import { ExplorePreviewType } from '../../types';

type FeedFetchStatus = 'pending' | 'complete' | 'fail';

type OptionType = {
	onScrollEnd?: () => void;
};

type ReturnType = {
	isEnd: boolean;
};

export default function DetailExplore() {
	const { category } = useParams();

	const [previewData, setPreviewData] = useState<ExplorePreviewType>({
		previews: [],
		pageInfo: {
			hasNext: true,
			page: 0,
			size: 0,
			offset: 0,
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
		const fetchExploreDetailData = async () => {
			if (category && status === 'pending' && previewData.pageInfo.hasNext) {
				const mappedCategory = CategoryMap[category];
				if (mappedCategory) {
					try {
						const previewFetch = await getCategoryExplore(
							mappedCategory,
							previewData.pageInfo.page + 1,
							accessToken
						);
						if (!previewFetch) {
							setStatus('fail');
							return;
						}

						setPreviewData({
							previews: [...previewData.previews, ...previewFetch.previews],
							pageInfo: previewFetch.pageInfo,
						});
						setStatus('complete');
					} catch {
						setStatus('fail');
					}
				}
			} else {
				setStatus('complete');
			}
		};

		fetchExploreDetailData();
	}, [
		accessToken,
		category,
		navigate,
		previewData.pageInfo.hasNext,
		previewData.pageInfo.page,
		previewData.previews,
		status,
	]);

	const { isEnd } = useInfiniteScroll({
		onScrollEnd: () => {
			setStatus('pending');
		},
	});

	if (category === undefined) return <></>;

	return (
		<>
			<Header />
			<PostList
				previews={previewData.previews}
				callbackUrl={'/explore/' + category}
				useHashtag={false}
			/>
			{isEnd && <div>loading</div>}
		</>
	);
}
