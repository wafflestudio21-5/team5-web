import styled from 'styled-components'
import reels from '../../assets/Images/NavBar/reels.png'
import post from '../../assets/Images/Profile/AddPost/post.png'
import story from '../../assets/Images/Profile/AddPost/story.png'
import Icon from '../../shared/Icon.tsx'
import Modal from '../../shared/Modal.tsx'

const AddPostModalContainer = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;

	width: 100%;
	height: 40%;

	background-color: white;
	border-top-left-radius: 1rem;
	border-top-right-radius: 1rem;

	& h2 {
	}

	& hr {
		width: 100%;
	}

	& img {
		height: 1.7rem;
		width: 1.7rem;
		margin: 1rem;
	}
`

const CellContainer = styled.div`
	display: flex;
	flex-direction: column;
	align-items: flex-start;

	width: 100%;

	& hr {
		width: 70%;
	}
`

const Cell = styled.div`
	display: flex;
	flex-direction: row;
	align-items: center;

	width: 100%;

	&:hover {
		cursor: pointer;
	}
`

type Props = {
	close: () => void
	isClosing: boolean
}

export default function AddPostModal({ close, isClosing }: Props) {
	return (
		<Modal onBackgroundClick={close} isClosing={isClosing}>
			<AddPostModalContainer>
				<h2>만들기</h2>
				<hr />
				<CellContainer>
					<Cell>
						<Icon src={reels} alt="릴스" />
						<p>릴스</p>
					</Cell>
					<Cell>
						<Icon src={post} alt="게시물" />
						<p>게시물</p>
					</Cell>
					<Cell>
						<Icon src={story} alt="스토리" />
						<p>스토리</p>
					</Cell>
				</CellContainer>
			</AddPostModalContainer>
		</Modal>
	)
}
