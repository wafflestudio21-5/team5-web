import styled from 'styled-components'
import defaultProfile from '../../assets/Images/Profile/default-profile.svg'
import editCancel from '../../assets/Images/Profile/EditProfile/edit-cancel.png'
import editSave from '../../assets/Images/Profile/EditProfile/edit-save.png'
import { useNavigate } from 'react-router-dom'
// import { getColor } from '../../styles/Theme.tsx'

const ProfileLayout = styled.main`
	width: 100%;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
`

const HeaderContainer = styled.div`
	width: 95%;
	display: flex;
	flex-direction: row;
	justify-content: space-between;
	align-items: center;
	margin: 0.5rem 0 2.5rem 0;

	& img {
		width: 1.7rem;
		height: 1.7rem;

		&:hover {
			cursor: pointer;
		}
	}

	& h2 {
		margin: 0 auto 0 2rem;
	}
`

const ProfileImageContainer = styled.div`
	width: 100%;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;

	& img {
		width: 6rem;
		height: 6rem;
		border-radius: 50%;
		border: 1px solid #8e8e8e;

		&:hover {
			cursor: pointer;
		}
	}

	& p.profile-image-edit {
		font-size: 1.2rem;
		color: #0095f6;
		margin: 1.5rem 0;

		&:hover {
			cursor: pointer;
		}
	}
`

const EditProfileContainer = styled.div`
	width: 95%;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: flex-start;

	& label {
		font-size: 1rem;
		color: ${(props) => props.theme.colors.grey};
		margin-bottom: 0.4rem;
	}

	& input {
		width: 100%;
		font-size: 1.2rem;
		margin-bottom: 1rem;
		padding: 0.5rem 0;

		border: none;
		border-bottom: 1px solid #8e8e8e;

		&:focus {
			outline: none;
		}
	}
`

export default function Profile() {
	const navigate = useNavigate()

	const onClickEditCancel = () => {
		navigate('/id')
	}

	return (
		<ProfileLayout>
			<HeaderContainer>
				<img
					src={editCancel}
					alt="프로필 편집 취소"
					onClick={onClickEditCancel}
				/>
				<h2>프로필 편집</h2>
				<img src={editSave} alt="프로필 편집 저장" />
			</HeaderContainer>
			<ProfileImageContainer>
				<img src={defaultProfile} alt="프로필 사진" />
				<p className="profile-image-edit">프로필 사진 변경</p>
			</ProfileImageContainer>
			<EditProfileContainer>
				<label htmlFor="name">이름</label>
				<input type="text" id="name" />
				{/* nickname은 30자 제한 */}
				<label htmlFor="nickname">사용자 이름</label>
				<input type="text" id="nickname" maxLength={30} />
				<label htmlFor="introduction">소개</label>
				<input type="text" id="introduction" />
			</EditProfileContainer>
		</ProfileLayout>
	)
}
