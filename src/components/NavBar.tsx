import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import styled from 'styled-components';

import homeBlack from '../assets/Images/NavBar/homeBlack.png';
import homeWhite from '../assets/Images/NavBar/homeWhite.png';
import reels from '../assets/Images/NavBar/reels.png';
import search from '../assets/Images/NavBar/search.png';
import searchBold from '../assets/Images/NavBar/searchBold.png';
import addPost from '../assets/Images/Profile/add-post.png';
import defaultProfile from '../assets/Images/Profile/default-profile.svg';
import { useUserContext } from '../contexts/UserContext.tsx';
import Icon from '../shared/Icon.tsx';
import { getColor } from '../styles/Theme.tsx';

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
`;

export default function NavBar() {
	const navigate = useNavigate();
	const currentURL = useLocation().pathname;
	const { username } = useUserContext();

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
					src={currentURL === '/search' ? searchBold : search}
					alt="Search"
					onClick={() => navigate('/search')}
				></Icon>
<<<<<<< HEAD
				<Icon
					src={addPost}
					alt="AddPost"
					onClick={() => navigate('/addPost')}
				></Icon>
=======
				<Icon src={addPost} alt="AddPost">
					{/*	게시물 추가 관련 기능 추가 예정*/}
				</Icon>
>>>>>>> develope
				<Icon
					src={reels}
					alt="Explore"
					onClick={() => navigate('/explore')}
				></Icon>
				<Icon
					src={defaultProfile}
					alt="Profile"
					onClick={() => navigate(`/${username}`)}
				></Icon>
			</NavBarLayout>
		</div>
	);
}
