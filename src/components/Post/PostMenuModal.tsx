import styled from 'styled-components'
import Modal from '../../shared/Modal/Modal'
import saveIcon from '../../assets/Images/Post/save.svg'
import Icon from '../../shared/Icon'

const ModalContent = styled.div`
	display: flex;
	flex-direction: column;
	gap: 0.5rem;
	width: 430px;
	padding: 1rem;
	box-sizing: border-box;
	background-color: grey;
	border-radius: 1rem 1rem 0 0;
`

const SaveQRContainer = styled.div`
	display: flex;
	flex-direction: row;
	gap: 1px;
	width: 100%;
	flex-grow: 1;
`

const ButtonGroup = styled.div`
	width: 100%;
	display: flex;
	flex-direction: column;
	border: 1px solid grey;
	border-radius: 1rem;
	overflow: hidden;
	justify-content: center;
	gap: 0;
	font-size: 0;
	& button {
		background-color: darkGrey;
		min-height: 2rem;
		font-size: 0.7rem;
	}
`

export default function PostMenuModal({
	postId,
	close,
	isClosing,
}: {
	postId: number | null
	close: () => void
	isClosing: boolean
}) {
	return (
		<Modal onBackgroundClick={close} isClosing={isClosing}>
			<ModalContent>
				<SaveQRContainer>
					<ButtonGroup>
						<button>
							<div>
								<Icon src={saveIcon} />
							</div>
							저장
						</button>
					</ButtonGroup>
					<ButtonGroup>
						<button>
							<div>
								<Icon src={saveIcon} />
							</div>
							QR
						</button>
					</ButtonGroup>
				</SaveQRContainer>
				<ButtonGroup>
					<button>즐겨찾기에 추가</button>
					<button>팔로우 취소</button>
				</ButtonGroup>
				<ButtonGroup>
					<button>이 계정 정보</button>
					<button>이 게시물이 표시되는 이유</button>
					<button>숨기기</button>
					<button>신고</button>
				</ButtonGroup>
			</ModalContent>
		</Modal>
	)
}
