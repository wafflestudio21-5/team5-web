import styled from 'styled-components';

import SearchBar from '../shared/SearchBar.tsx';

const SearchLayout = styled.div`
	width: 100%;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
`;

export default function Search() {
	return (
		<SearchLayout>
			<SearchBar />
		</SearchLayout>
	);
}
