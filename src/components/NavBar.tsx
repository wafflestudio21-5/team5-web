import styled from 'styled-components'
import { Outlet, useLocation, useNavigate } from 'react-router-dom'
import Icon from '../shared/Icon.tsx'
import { getColor } from '../styles/Theme.tsx'
import homeBlack from '../assets/Images/NavBar/homeBlack.png'
import homeWhite from '../assets/Images/NavBar/homeWhite.png'
import search from '../assets/Images/NavBar/search.png'
import searchBold from '../assets/Images/NavBar/searchBold.png'
import addPost from '../assets/Images/Profile/add-post.png'
import reels from '../assets/Images/NavBar/reels.png'
import defaultProfile from '../assets/Images/Profile/default-profile.svg'

const NavBarLayout = styled.nav`
	width: 430px;
	display: flex;
	flex-direction: row;
	justify-content: space-between;
	align-items: center;

	position: fixed;
	left: 50%;
	transform: translateX(-50%);
	bottom: 0;
	z-index: 99;

	background-color: ${getColor('white')};
	border-top: 1px solid ${getColor('grey')};
	padding: 0.8rem 1.5rem;
	box-sizing: border-box;
`

export default function NavBar() {
	const navigate = useNavigate()
	const currentURL = useLocation().pathname

	return (
		<div>
			<Outlet />
			<NavBarLayout>
				<Icon
					src={currentURL === '/' ? homeBlack : homeWhite}
					alt="Home"
					onClick={() => navigate('/')}
				></Icon>
				<Icon
					src={currentURL === '/explore' ? searchBold : search}
					alt="Explore"
					onClick={() => navigate('/explore')}
				></Icon>
				<Icon src={addPost} alt="AddPost" onClick={()=>navigate('/addPost')}></Icon>
				<Icon src={reels} alt="Reels" onClick={() => navigate('/reels')}></Icon>
				<Icon
					src={defaultProfile}
					alt="Profile"
					onClick={() => navigate('/id')}
				></Icon>
			</NavBarLayout>
		</div>
	)
}
