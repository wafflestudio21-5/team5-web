// import PostList from '../../components/Post/PostList';
// import feed from '../../test/data/feed.json';
import styled from 'styled-components';
import SubjectBar from '../../components/Explore/SubjectBar';
import Preview from '../../components/Explore/Preview';
import { CategoryType } from '../../types';
import { useState } from 'react';

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
	const [category, setCategory] = useState<CategoryType | null>(null);
	return (
		<>
			<Logo
				src="https://1000logos.net/wp-content/uploads/2017/02/Logo-Instagram.png"
				alt="로고"
			/>
			<SubjectBar setCategory={setCategory} category={category} />
			{subjects.map((subject) => (
				<Preview category={subject} />
			))}
			<br />
			<br />
			<br />
		</>
	);
}
