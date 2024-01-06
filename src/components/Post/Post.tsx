import styled from 'styled-components'
import UserInfo from './UserInfo'
import PostImage from './PostImage'
import ReactSection from './ReactSection'

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

const UserInfoContainer = styled.div`
	display: flex;
	width: 100%;
	flex-direction: row;
	justify-content: space-between;
	padding-bottom: 0.75rem;
	padding-left: 0.25rem;
	box-sizing: border-box;
`

const ExtraButton = styled.button`
	background-color: transparent;
	border: none;
	box-sizing: border-box;
	padding: 0;
	display: flex;
	align-items: center;
	& img {
		width: 2em;
		height: 1.5em;
	}
`

export default function Post({ postId }: { postId: number }) {
	return (
		<Container>
			<UserInfoContainer>
				<UserInfo />
				<ExtraButton>
					<img src="/ellipsis.svg" alt="ellipsis" />
				</ExtraButton>
			</UserInfoContainer>
			<PostImage />
			<ReactSection postId={postId} />
		</Container>
	)
}
