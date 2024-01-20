import styled from 'styled-components';

import StoryProfile from './StoryProfile';

const Container = styled.div`
	display: flex;
	flex-direction: row;
	overflow-x: hidden;
	width: 100%;
	margin-bottom: 1rem;
`;

export default function StoryBar() {
	return (
		<Container>
			<StoryProfile />
			<StoryProfile />
			<StoryProfile />
			<StoryProfile />
			<StoryProfile />
			<StoryProfile />
			<StoryProfile />
			<StoryProfile />
			<StoryProfile />
			<StoryProfile />
			<StoryProfile />
			<StoryProfile />
			<StoryProfile />
		</Container>
	);
}
