import styled from 'styled-components'
import PostList from '../components/Post/PostList'

const HomeLayout = styled.main`
	width: 100%;
	display: flex;
	flex-direction: row;
	overflow-y: scroll;
	margin-top: 1rem;
	justify-content: center;
	& .story-post {
		display: flex;
		flex-direction: column;
	}
`

export default function Home() {
	return (
		<HomeLayout>
			<div className="story-post">
				<PostList />
			</div>
		</HomeLayout>
	)
}
