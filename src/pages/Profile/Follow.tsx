import styled from 'styled-components'
import { getColor } from '../../styles/Theme.tsx'
import Icon from '../../shared/Icon.tsx'
import { useNavigate } from 'react-router-dom'
import back from '../../assets/Images/Profile/back.png'
import SearchBar from '../../shared/SearchBar.tsx'

const FollowLayout = styled.main`
	width: 100%;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
`

const HeaderContainer = styled.div`
	width: 95%;
	display: flex;
	flex-direction: row;
	justify-content: space-between;
	align-items: center;
	margin-bottom: 2.5rem;

	& h2 {
		margin: 0 auto 0 2rem;
	}
`

const ToggleContainer = styled.div`
	width: 100%;
	display: flex;
	flex-direction: row;
	justify-content: space-between;
	align-items: center;
	margin-bottom: 2.5rem;
`

export default function Follow() {
	const navigate = useNavigate()

	const navigateBack = () => {
		navigate('/id')
	}

	return (
		<FollowLayout>
			<HeaderContainer>
				<Icon src={back} alt="취소" onClick={navigateBack} />
				<h2>dndw0</h2>
			</HeaderContainer>
			<ToggleContainer>
				<p>팔로워</p>
				<p>팔로잉</p>
			</ToggleContainer>
			<SearchBar />
		</FollowLayout>
	)
}
