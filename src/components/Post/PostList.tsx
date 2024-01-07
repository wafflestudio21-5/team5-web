import styled from 'styled-components'
import Post from './Post'
import { useState } from 'react'
import PostModal from '../Modal/PostModal'

const Container = styled.div`
	background-color: white;
	width: 100%;
	display: flex;
	flex-direction: column;
	justify-content: center;
`

type PostModalState =
	| { state: 'open' | 'closing'; postId: number | null }
	| { state: 'closed' }

export default function PostList() {
	const [postModal, setPostModal] = useState<PostModalState>({
		state: 'closed',
	})

	const openPostModal = (postId: number) => {
		setPostModal({
			state: 'open',
			postId: postId,
		})
	}

	return (
		<>
			<Container>
				<Post postId={1} openPostModal={openPostModal} />
				<Post postId={1} openPostModal={openPostModal} />
				<Post postId={1} openPostModal={openPostModal} />
				<Post postId={1} openPostModal={openPostModal} />
			</Container>
			{postModal.state !== 'closed' && (
				<PostModal
					isClosing={postModal.state === 'closing'}
					close={() => {
						setPostModal({ state: 'closing', postId: postModal.postId })
						setTimeout(() => setPostModal({ state: 'closed' }), 500)
					}}
					postId={postModal.postId}
				/>
			)}
		</>
	)
}
