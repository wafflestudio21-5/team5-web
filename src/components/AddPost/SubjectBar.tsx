import { useEffect, useState } from 'react';
import styled from 'styled-components';

import { usePostContext } from '../../contexts/PostContext';

import KorToEng from './KorToEng';

type DivType = {
	$isclicked: boolean;
	onClick: () => void;
};

const Subject = styled.div<DivType>`
	display: inline-block;
	width: 4rem;
	height: 1.7rem;
	padding-top: 0.3rem;
	margin: 0 0.5rem;
	background-color: ${({ $isclicked }) => ($isclicked ? 'black' : 'gainsboro')};
	color: ${({ $isclicked }) => ($isclicked ? 'white' : 'black')};
	border-radius: 1.2rem;
	text-align: center;
	&:hover {
		cursor: pointer;
	}
`;
const ScrollContainer = styled.div`
	overflow-x: auto;
	width: 100%;
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
const Div = styled.div`
	width: 90%;
	margin: 0.5rem 0.5rem 0.5rem;
	font-size: 0.7rem;
	color: red;
`;

type SubjectBarType = {
	isClicked: boolean;
};

export default function SubjectBar({ isClicked }: SubjectBarType) {
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
	useEffect(() => {
		if (clickNum === 0) setCategory(null);
		else setCategory(KorToEng(subjects[clickNum - 1]));
	}, [clickNum]);
	const { setCategory } = usePostContext();
	const handleClick = (num: number) => {
		if (clickNum === 0) setClickNum(num);
		else if (clickNum === num) setClickNum(0);
		else setClickNum(num);
	};
	return (
		<>
			<SubjectBox>
				<ScrollContainer>
					{subjects.map((item, index) => (
						<Subject
							key={index}
							$isclicked={clickNum === index + 1}
							onClick={() => handleClick(index + 1)}
						>
							{item}
						</Subject>
					))}
				</ScrollContainer>
			</SubjectBox>
			{!isClicked && <Div>카테고리를 선택해주세요.</Div>}
		</>
	);
}
