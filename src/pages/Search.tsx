import { useEffect, useState } from 'react';
import styled from 'styled-components';

import { getSearchPreview } from '../apis/search.tsx';
import { useUserContext } from '../contexts/UserContext.tsx';
import SearchBar from '../shared/SearchBar.tsx';
/* import { MiniProfileType } from '../types.ts';
 */
const SearchLayout = styled.div`
	width: 100%;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
`;

export default function Search() {
	const { accessToken } = useUserContext();

	// 입력 관리
	const [text, setText] = useState('');
	const [debounceTimer, setDebounceTimer] = useState<number | null>(null);

	// 검색 결과 관리
	/* 	const [searchPreview, setSearchPreview] = useState<MiniProfileType[]>([]);
	 */
	useEffect(() => {
		if (debounceTimer) {
			clearTimeout(debounceTimer);
		}

		const timer = setTimeout(() => {
			if (text) {
				getSearchPreview(accessToken, text);
			}
		}, 300);

		setDebounceTimer(3); /* timer); */

		return () => clearTimeout(timer);
	}, [text]);

	return (
		<SearchLayout>
			<SearchBar text={text} onChangeSearch={setText} />
		</SearchLayout>
	);
}
