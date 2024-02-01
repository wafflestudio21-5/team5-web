import styled from 'styled-components';
import KorToEng from '../AddPost/KorToEng';
import { useNavigate } from 'react-router-dom';

const Subject = styled.div`
	display: inline-block;
	width: 4rem;
	height: 1.7rem;
	padding-top: 0.3rem;
	margin: 0 0.5rem;
	background-color: gainsboro;
	color: black;
	border-radius: 1.2rem;
	text-align: center;
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

export default function Select() {
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
	const navigate = useNavigate();
	return (
		<SubjectBox>
			<ScrollContainer>
				{subjects.map((item) => (
					<Subject onClick={() => navigate(`/explore/${KorToEng(item)}`)}>
						{item}
					</Subject>
				))}
			</ScrollContainer>
		</SubjectBox>
	);
}
