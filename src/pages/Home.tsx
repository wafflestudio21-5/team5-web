import styled from 'styled-components';
import PostList from '../components/Feed';
import Header from '../components/Header';
import StoryBar from '../components/Story/StoryBar';

const HomeLayout = styled.main`
	width: 100%;
	display: flex;
	flex-direction: row;
	overflow-y: hidden;
	margin-top: 1rem;
	justify-content: center;
	padding: 0;
	& .story-post {
		width: 100%;
		display: flex;
		flex-direction: column;
	}
`;

export default function Home() {
	return (
		<>
			<Header />
			<HomeLayout>
				<div className="story-post">
					<StoryBar />
					<PostList />
				</div>
			</HomeLayout>
		</>
	);
}
