// import PostList from '../../components/Post/PostList';
// import feed from '../../test/data/feed.json';
import styled from 'styled-components';
import SubjectBar from '../../components/CreatePost/SubjectBar';

const Logo = styled.img`
	width: 8rem;
	margin-bottom: -1rem;
`;

export default function Explore() {
	return (
		<>
			<Logo
				src="https://1000logos.net/wp-content/uploads/2017/02/Logo-Instagram.png"
				alt="로고"
			/>
			<SubjectBar />
		</>
	);
}
