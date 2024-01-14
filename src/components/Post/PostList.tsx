import styled from 'styled-components'
import Post from './Post'
import { useState } from 'react'
import PostMenuModal from './PostMenuModal.tsx'

const Container = styled.div`
	background-color: white;
	width: 100%;
	display: flex;
	flex-direction: column;
	justify-content: center;
`

type ModalState = 'open' | 'closed' | 'closing'

export default function PostList() {
	const [menuModal, setMenuModal] = useState<ModalState>('closed')

	const [menuPostId, setMenuPostId] = useState<number | null>(null)

	const openMenuModal = (postId: number) => {
		setMenuPostId(postId)
		setMenuModal('open')
	}

	return (
		<>
			<Container>
				<Post postId={1} openMenuModal={openMenuModal} />
				<Post postId={1} openMenuModal={openMenuModal} />
				<Post postId={1} openMenuModal={openMenuModal} />
				<Post postId={1} openMenuModal={openMenuModal} />
			</Container>
			{menuModal !== 'closed' && (
				<PostMenuModal
					close={() => {
						setMenuModal('closing')
						setTimeout(() => {
							setMenuModal('closed')
							setMenuPostId(null)
						}, 500)
					}}
					isClosing={menuModal === 'closing'}
					postId={menuPostId}
				/>
			)}
		</>
	)
}
