import styled from 'styled-components';
import PostList from '../Post/PostList';
import posts from '../../test/data/postlist.json';
import { PostListProps } from '../../types';
import { useNavigate } from 'react-router-dom';
import KorToEng from '../CreatePost/KorToEng';

const Header = styled.div`
	width: 100%;
	height: 2rem;
	margin-top: 0.5rem;
	padding-bottom: 0.5rem;
	padding-top: 1.5rem;
	border-bottom: 1px solid gainsboro;
	border-top: 1px solid gainsboro;
`;
const Subject = styled.div`
	display: inline-block;
	background-color: #e9e9e9;
	color: #615f5f;
	text-align: center;
	border: none;
	border-radius: 0.5rem;
	padding: 0.3rem 0.7rem;
	margin-left: 0.5rem;
`;
const Text = styled.div`
	display: inline-block;
	margin-left: 0.5rem;
`;
const More = styled.div`
	background-color: gainsboro;
	border: none;
	width: 96%;
	padding: 0.5rem 0.5rem;
`;
const RightArrow = styled.img`
	width: 1rem;
	float: right;
	margin-right: 0.2rem;
	padding-top: 0.2rem;
`;
type PreviewType = {
	category: string;
};

export default function Preview({ category }: PreviewType) {
	const navigate = useNavigate();
	const newPosts: PostListProps = posts;
	return (
		<>
			<Header>
				<Subject>{category}</Subject>
				<Text>관련 게시물</Text>
			</Header>
			<PostList {...newPosts} />
			<More onClick={() => navigate(`/explore/${KorToEng(category)}`)}>
				더보기
				<RightArrow
					src="https://cdn-icons-png.flaticon.com/512/271/271228.png"
					alt="select"
				/>
			</More>
		</>
	);
}
