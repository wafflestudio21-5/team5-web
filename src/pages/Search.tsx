import { useCallback, useEffect, useState } from 'react';
import styled from 'styled-components';

import {
	getRecentSearchList,
	getSearchAll,
	getSearchPreview,
} from '../apis/search.ts';
import MiniProfile from '../components/MiniProfile.tsx';
import RecentSearch from '../components/RecentSearch.tsx';
import { useUserContext } from '../contexts/UserContext.tsx';
import SearchBar from '../shared/SearchBar.tsx';
import { MiniProfileType, RecentSearchType } from '../types.ts';

const SearchLayout = styled.div`
	width: 100%;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
`;

type FeedFetchStatus = 'pending' | 'complete' | 'fail';

type OptionType = {
	onScrollEnd?: () => void;
};

type ReturnType = {
	isEnd: boolean;
};

export default function Search() {
	const { accessToken } = useUserContext();
	const [isLoading, setIsLoading] = useState(true);
	const [status, setStatus] = useState<FeedFetchStatus>('pending');

	const [page, setPage] = useState(0);
	const [hasNext, setHasNext] = useState(true);
	const [showAll, setShowAll] = useState(false);

	// 입력 관리
	const [searchInput, setSearchInput] = useState('');
	const [debounceTimer, setDebounceTimer] = useState<number | null>(null);

	// 최근 검색 관리
	const [recentSearchList, setRecentSearchList] = useState<RecentSearchType[]>(
		[]
	);

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
		const fetchRecentSearchList = async () => {
			const result = await getRecentSearchList(accessToken);
			if (result) {
				setRecentSearchList(result);
			}
		};

		setRecentSearchList([]);
		setIsLoading(true);
		fetchRecentSearchList();
		setIsLoading(false);
	}, []);

	useEffect(() => {
		const fetchSearchAll = async () => {
			if (showAll && hasNext && status === 'pending') {
				const result = await getSearchAll(accessToken, searchInput, page + 1);
				if (result) {
					setPage(result.pageInfo.page);
					setHasNext(result.pageInfo.hasNext);
					setSearchPreview([...searchPreview, ...result.miniProfiles]);
					setStatus('complete');
				} else {
					setStatus('fail');
				}
			}
		};

		fetchSearchAll();
	}, [showAll, status]);

	const { isEnd } = useInfiniteScroll({
		onScrollEnd: () => {
			setStatus('pending');
		},
	});

	// 검색 결과 관리
	const [searchPreview, setSearchPreview] = useState<MiniProfileType[]>([]);

	useEffect(() => {
		if (debounceTimer) {
			clearTimeout(debounceTimer);
		}

		const timer = setTimeout(async () => {
			if (searchInput) {
				const previewResults = await getSearchPreview(accessToken, searchInput);
				setSearchPreview(previewResults);
			}
		}, 300);

		setDebounceTimer(timer as unknown as number);

		return () => clearTimeout(timer);
	}, [searchInput]);

	const handleSearchChange = (text: string) => {
		setShowAll(false);
		setHasNext(true);
		setPage(0);
		setSearchInput(text);
	};

	return (
		<SearchLayout>
			<SearchBar text={searchInput} onChangeSearch={handleSearchChange} />
			{isLoading ? (
				<></>
			) : searchInput === '' ? (
				recentSearchList &&
				recentSearchList.length > 0 &&
				recentSearchList.map((data) => (
					<RecentSearch
						searchId={data.searchId}
						text={data.text}
						user={data.miniProfile}
					/>
				))
			) : (
				searchPreview &&
				searchPreview.length > 0 &&
				searchPreview.map((user) => (
					<MiniProfile key={user.userId} user={user} action="hideButton" />
				))
			)}
			{showAll ? (
				isEnd && <></>
			) : (
				<span
					onClick={() => {
						setShowAll(true);
						setStatus('pending');
					}}
				>
					결과 모두 보기
				</span>
			)}
		</SearchLayout>
	);
}
