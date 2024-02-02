import { useEffect, useState } from 'react';
import styled from 'styled-components';

import { getRecentSearchList, getSearchPreview } from '../apis/search.ts';
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

export default function Search() {
	const { accessToken } = useUserContext();
	const [isLoading, setIsLoading] = useState(true);

	// 입력 관리
	const [searchInput, setSearchInput] = useState('');
	const [debounceTimer, setDebounceTimer] = useState<number | null>(null);

	// 최근 검색 관리
	const [recentSearchList, setRecentSearchList] = useState<RecentSearchType[]>(
		[]
	);

	// 검색 결과 관리
	const [searchPreview, setSearchPreview] = useState<MiniProfileType[]>([]);

	const fetchRecentSearchList = async () => {
		const result = await getRecentSearchList(accessToken);
		if (result) {
			setRecentSearchList(result);
		}
	};

	useEffect(() => {
		setIsLoading(true);
		setRecentSearchList([]);
		setSearchPreview([]);
		fetchRecentSearchList();
		setIsLoading(true);
	}, []);

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

	return (
		<SearchLayout>
			<SearchBar text={searchInput} onChangeSearch={setSearchInput} />
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
					<MiniProfile key={user.userId} user={user} action="search" />
				))
			)}
			<p>결과 모두 보기</p>
		</SearchLayout>
	);
}
