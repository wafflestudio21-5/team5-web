import styled from 'styled-components';

import PostHeader from './PostHeader';
import PostImage from './PostImage';
import ReactSection from './ReactSection';

const Container = styled.article`
	display: flex;
	flex-direction: column;
	height: fit-content;
	width: 30rem;
	border-bottom: 1px solid gray;
	margin-bottom: 1rem;
	padding-bottom: 1rem;
	box-sizing: border-box;
`;

type Props = {
	postId: number | null;
	openPostModal: (postId: number) => void;
};

export default function Post({ postId, openPostModal }: Props) {
	return (
		<Container>
			<PostHeader />
			<PostImage />
			<ReactSection postId={postId} openPostModal={openPostModal} />
		</Container>
	);
}
