import styled from 'styled-components';

import Search from '../assets/Images/search.png';
import { getColor } from '../styles/Theme.tsx';

const SearchBarLayout = styled.div`
	display: flex;
	flex-direction: row;
	justify-content: center;
	align-items: center;
	width: 90%;
	margin-bottom: 1rem;
`;

const SearchBarContainer = styled.div`
	display: flex;
	flex-direction: row;
	align-items: center;

	width: 100%;
	height: 3rem;

	border: none;
	border-radius: 0.5rem;
	background-color: ${getColor('extraLightGrey')};

	& img {
		width: 1.5rem;
		height: 1.5rem;
		margin: 0 1rem 0 1rem;
	}

	& input {
		width: 100%;
		border: none;
		background: none;
		font-size: 1.2rem;

		&:focus {
			outline: none;
		}
	}
`;

export default function SearchBar({
	text,
	onChangeSearch,
}: {
	text: string;
	onChangeSearch: (e: string) => void;
}) {
	return (
		<SearchBarLayout>
			<SearchBarContainer>
				<label htmlFor="search">
					<img src={Search} alt="검색" />
				</label>
				<input
					type="text"
					id="search"
					placeholder="검색"
					value={text}
					onChange={(e) => onChangeSearch(e.target.value)}
				/>
			</SearchBarContainer>
		</SearchBarLayout>
	);
}
