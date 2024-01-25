import styled from 'styled-components';

import Feed from '../components/Feed';
import Header from '../components/Post/Header';
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
					<Feed />
				</div>
			</HomeLayout>
		</>
	);
}
