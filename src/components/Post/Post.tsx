import styled from 'styled-components';

import { PostType } from '../../types';

import PostHeader from './PostHeader';
import PostImage from './PostImage';
import ReactSection from './ReactSection';

const Container = styled.article`
	display: flex;
	flex-direction: column;
	height: fit-content;
	width: 100%;
	border-bottom: 1px solid gray;
	margin-bottom: 1rem;
	padding-bottom: 1rem;
`;

type Props = {
	postData: PostType | null;
	openMenuModal: (postId: number) => void;
	openCommentModal: (post: PostType) => void;
};

export default function Post({
	postData,
	openMenuModal,
	openCommentModal,
}: Props) {
	return (
		postData && (
			<Container id={'post' + postData.id}>
				<PostHeader
					user={postData.user}
					showMenu={() => {
						openMenuModal(postData.id);
					}}
				/>
				<PostImage media={postData.media} />
				<ReactSection
					postData={postData}
					showComment={() => {
						openCommentModal(postData);
					}}
				/>
			</Container>
		)
	);
}
