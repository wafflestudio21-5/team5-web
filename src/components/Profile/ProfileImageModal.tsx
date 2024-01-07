import styled from 'styled-components'

const ProfileImageModalBackground = styled.div`
	//	화면 중앙에 모달 위치시키기
	position: fixed;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;

	background-color: rgba(0, 0, 0, 0.5);
	z-index: 999;
`

const ProfileImageModalContainer = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;

	width: 350px;
	height: 12%;

	background-color: white;
	border-radius: 1rem;

	& p {
		display: flex;
		align-items: center;

		font-size: 1.2rem;
		width: calc(100% - 1rem); // 1rem은 padding-left
		height: 50%;

		margin: 0;
		padding-left: 1rem;

		&:hover {
			cursor: pointer;
		}
	}
`

export default function ProfileImageModal({
	onCloseProfileImageModal,
}: {
	onCloseProfileImageModal: () => void
}) {
	return (
		<ProfileImageModalBackground onClick={onCloseProfileImageModal}>
			<ProfileImageModalContainer onClick={(e) => e.stopPropagation()}>
				<p>프로필 사진 추가</p>
				<p>스토리에 추가</p>
			</ProfileImageModalContainer>
		</ProfileImageModalBackground>
	)
}
