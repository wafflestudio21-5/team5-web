import styled from 'styled-components'
import PostImage from './PostImage'
import ReactSection from './ReactSection'
import PostHeader from './PostHeader'

const Container = styled.article`
	display: flex;
	flex-direction: column;
	height: fit-content;
	width: 100%;
	border-bottom: 1px solid gray;
	margin-bottom: 1rem;
	padding-bottom: 1rem;
	box-sizing: border-box;
`

type Props = {
	postId: number | null
	openMenuModal: (postId: number) => void
}

export default function Post({ postId, openMenuModal }: Props) {
	return (
		<Container>
			<PostHeader
				showMenu={() => {
					if (postId) openMenuModal(postId)
				}}
			/>
			<PostImage imageUrl="https://dimg.donga.com/wps/NEWS/IMAGE/2023/07/05/120093215.1.edit.jpg" />
			<ReactSection postId={postId} />
		</Container>
	)
}
