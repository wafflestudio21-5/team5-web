import styled from 'styled-components'
import reels from '../../assets/Images/NavBar/reels.png'
import post from '../../assets/Images/Profile/AddPost/post.png'
import story from '../../assets/Images/Profile/AddPost/story.png'
import Icon from '../../shared/Icon.tsx'
import Modal from '../../shared/Modal.tsx'

const MenuModalContainer = styled.div`
	height: 30%;
`

const CellContainer = styled.div`
	display: flex;
	flex-direction: column;
	align-items: flex-start;

	width: 100%;
	margin-top: 1rem;
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

export default function MenuModal({ close, isClosing }: Props) {
	return (
		<Modal onBackgroundClick={close} isClosing={isClosing}>
			<MenuModalContainer>
				<CellContainer>
					<Cell>
						<Icon src={reels} alt="설정 및 개인정보" />
						<p>설정 및 개인정보</p>
					</Cell>
					<Cell>
						<Icon src={post} alt="내 활동" />
						<p>내 활동</p>
					</Cell>
					<Cell>
						<Icon src={story} alt="저장됨" />
						<p>저장됨</p>
					</Cell>
				</CellContainer>
			</MenuModalContainer>
		</Modal>
	)
}
