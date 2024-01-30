import { useState } from 'react';
import styled from 'styled-components';
import { usePostContext } from '../../contexts/PostContext';
import { CategoryType } from '../../types';

type DivType = {
	isClicked: boolean;
	onClick: () => void;
};

const Subject = styled.div<DivType>`
	display: inline-block;
	width: 4rem;
	height: 1.7rem;
	padding-top: 0.3rem;
	margin: 0 0.5rem;
	background-color: ${({ isClicked }) => (isClicked ? 'black' : 'gainsboro')};
	color: ${({ isClicked }) => (isClicked ? 'white' : 'black')};
	border-radius: 1.2rem;
	text-align: center;
`;
const ScrollContainer = styled.div`
	overflow-x: auto;
	height: 3rem;
	white-space: nowrap;
	&::-webkit-scrollbar {
		display: none;
	}
`;
const SubjectBox = styled.div`
	width: 100%;
	border-bottom: 1px solid gainsboro;
	padding-top: 1rem;
	overflow-x: auto;
`;

export default function Select() {
	const [clickNum, setClickNum] = useState(0);
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
	const subjectsEng: CategoryType[] = [
		'GAME',
		'TRAVEL',
		'FOOD',
		'SPORT',
		'ANIMAL',
		'LIFE',
		'FASHION',
		'HUMOR',
		'ART',
		'NEWS',
	];
	const { setCategory, category } = usePostContext();
	const handleClick = (num: number) => {
		if (clickNum === 0) setClickNum(num);
		else if (clickNum === num) setClickNum(0);
		else setClickNum(num);

		if (clickNum === 0) setCategory(null);
		else setCategory(subjectsEng[num - 1]);
		console.log(category);
	};
	return (
		<SubjectBox>
			<ScrollContainer>
				{subjects.map((item, index) => (
					<Subject
						isClicked={clickNum === index + 1}
						onClick={() => handleClick(index + 1)}
					>
						{item}
					</Subject>
				))}
			</ScrollContainer>
		</SubjectBox>
	);
}
