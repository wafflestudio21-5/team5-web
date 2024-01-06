import styled from 'styled-components'
import PostImage from './PostImage'
import ReactSection from './ReactSection'
import PostHeader from './PostHeader'

const Container = styled.article`
	display: flex;
	flex-direction: column;
	height: fit-content;
	width: 30rem;
	border-bottom: 1px solid gray;
	margin-bottom: 1rem;
	padding-bottom: 1rem;
	box-sizing: border-box;
`

export default function Post({ postId }: { postId: number }) {
	return (
		<Container>
			<PostHeader />
			<PostImage />
			<ReactSection postId={postId} />
		</Container>
	)
}
