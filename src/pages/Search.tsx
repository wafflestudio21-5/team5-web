import { useEffect, useState } from 'react';
import styled from 'styled-components';

import { getRecentSearchList, getSearchPreview } from '../apis/search.ts';
import MiniProfile from '../components/MiniProfile.tsx';
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

	useEffect(() => {
		const fetchRecentSearchList = async () => {
			const result = await getRecentSearchList(accessToken);
			if (result) {
				setRecentSearchList(result);
			}

			setIsLoading(false);
		};

		setIsLoading(true);
		fetchRecentSearchList();
	}, []);

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
		}, 300); // 300ms delay

		setDebounceTimer(timer as unknown as number);

		return () => clearTimeout(timer);
	}, [searchInput]);

	return (
		<SearchLayout>
			<SearchBar text={searchInput} onChangeSearch={setSearchInput} />
			{isLoading ? (
				<p>Loading...</p>
			) : searchInput === '' ? (
				recentSearchList &&
				recentSearchList.length > 0 &&
				recentSearchList.map((data) =>
					data.isText ? (
						<p key={data.searchId}>{data.text}</p>
					) : (
						<MiniProfile
							key={data.searchId}
							user={data.miniProfile!}
							text="X"
						/>
					)
				)
			) : (
				searchPreview &&
				searchPreview.length > 0 &&
				searchPreview.map((user) => (
					<MiniProfile key={user.userId} user={user} text="X" />
				))
			)}
			<p>결과 모두 보기</p>
		</SearchLayout>
	);
}
