import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

import { getCompactExplore } from '../../apis/explore';
import { useUserContext } from '../../contexts/UserContext';
import { getColor } from '../../styles/Theme';
import { CategoryType, PreviewType } from '../../types';
import KorToEng from '../AddPost/KorToEng';
import PostList from '../Post/PostList';

const Container = styled.div`
	& .hover-react {
		background-color: ${getColor('pinkRed')};
		color: ${getColor('white')};
		transition:
			background-color 300ms,
			color 300ms;
	}
`;

const Header = styled.div`
	width: 100%;
	height: 2rem;
	margin-top: 0.5rem;
	padding-bottom: 0.5rem;
	padding-top: 1.5rem;
	border-bottom: 1px solid ${getColor('extraLightGrey')};
	border-top: 1px solid ${getColor('extraLightGrey')};
`;
const Subject = styled.div`
	display: inline-block;
	background-color: ${getColor('extraLightGrey')};
	color: ${getColor('darkGrey')};
	text-align: center;
	border: none;
	border-radius: 0.5rem;
	padding: 0.3rem 0.7rem;
	margin-left: 0.5rem;
	cursor: pointer;
`;
const Text = styled.div`
	display: inline-block;
	margin-left: 0.5rem;
`;
const More = styled.div`
	background-color: ${getColor('extraLightGrey')};
	border: none;
	width: 96%;
	padding: 0.5rem 0.5rem;
	cursor: pointer;
`;
const RightArrow = styled.img`
	width: 1rem;
	float: right;
	margin-right: 0.2rem;
	padding-top: 0.2rem;
`;
type PreviewProps = {
	category: string;
};

export default function Preview({ category }: PreviewProps) {
	const navigate = useNavigate();

	const [newPosts, setNewPosts] = useState<PreviewType[]>([]);
	const [hovered, setHovered] = useState(false);

	const { accessToken } = useUserContext();

	useEffect(() => {
		const fetchExploreData = async () => {
			try {
				const fetchData = await getCompactExplore(
					KorToEng(category) as CategoryType,
					accessToken
				);
				if (!fetchData) {
					return;
				}

				setNewPosts(fetchData);
			} catch {
				return;
			}
		};

		fetchExploreData();
	}, []);

	return (
		<Container>
			<Header>
				<Subject className={hovered ? 'hover-react' : ''}>{category}</Subject>
				<Text>관련 게시물</Text>
			</Header>
			<PostList
				previews={newPosts}
				callbackUrl={'/explore/' + KorToEng(category)?.toLowerCase()}
				useHashtag={false}
			/>
			<More
				onClick={() =>
					navigate(`/explore/${KorToEng(category)?.toLowerCase()}`)
				}
				onMouseEnter={() => setHovered(true)}
				onMouseLeave={() => setHovered(false)}
				className={hovered ? 'hover-react' : ''}
			>
				더보기
				<RightArrow
					src="https://cdn-icons-png.flaticon.com/512/271/271228.png"
					alt="select"
				/>
			</More>
		</Container>
	);
}
