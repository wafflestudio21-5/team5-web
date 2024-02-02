// import PostList from '../../components/Post/PostList';
// import feed from '../../test/data/feed.json';
import styled from 'styled-components';

import Preview from '../../components/Explore/Preview';
import SubjectBar from '../../components/Explore/SubjectBar';

const Logo = styled.img`
	width: 8rem;
	margin-bottom: -1rem;
	margin-left: 1rem;
`;

export default function Explore() {
	const subjects = [
		'게임',
		'여행',
		'음식',
		'스포츠',
		'동물',
		'일상',
		'패션',
		'유머',
		'예술',
		'뉴스',
	];
	return (
		<>
			<Logo
				src="https://1000logos.net/wp-content/uploads/2017/02/Logo-Instagram.png"
				alt="로고"
			/>
			<SubjectBar />
			{subjects.map((subject) => (
				<Preview category={subject} />
			))}
			<br />
			<br />
			<br />
		</>
	);
}
