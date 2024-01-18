import styled from 'styled-components'
import { getColor } from '../styles/Theme.tsx'
import Search from '../assets/Images/Search.png'

const SearchBarLayout = styled.div`
	display: flex;
	flex-direction: row;
	justify-content: center;
	align-items: center;
	width: 90%;
`

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
`

export default function SearchBar() {
	return (
		<SearchBarLayout>
			<SearchBarContainer>
				<label htmlFor="search">
					<img src={Search} alt="검색" />
				</label>
				<input type="text" id="search" placeholder="검색" />
			</SearchBarContainer>
		</SearchBarLayout>
	)
}
