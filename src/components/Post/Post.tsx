import styled from 'styled-components'
import PostImage from './PostImage'
import ReactSection from './ReactSection'
import PostHeader from './PostHeader'
import { PostDataType } from '../../contexts/PostContext'

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
	postData: PostDataType | null
	openMenuModal: (postId: number) => void
}

export default function Post({ postData, openMenuModal }: Props) {
	return (
		postData && (
			<Container>
				<PostHeader
					showMenu={() => {
						openMenuModal(postData.postId)
					}}
				/>
				<PostImage imageUrl={postData.imageUrl} />
				<ReactSection postId={postData.postId} />
			</Container>
		)
	)
}
