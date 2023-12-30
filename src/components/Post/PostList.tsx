import styled from 'styled-components'
import Post from './Post'

const Container = styled.div`
	background-color: white;
	width: 100%;
	display: flex;
	flex-direction: column;
	justify-content: center;
`

export default function PostList() {
	return (
		<Container>
			<Post />
			<Post />
			<Post />
			<Post />
			<Post />
			<Post />
			<Post />
			<Post />
			<Post />
			<Post />
		</Container>
	)
}
