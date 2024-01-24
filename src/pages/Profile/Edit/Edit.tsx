import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

import defaultProfile from '../../../assets/Images/Profile/default-profile.svg';
import editCancel from '../../../assets/Images/Profile/EditProfile/edit-cancel.png';
import editSave from '../../../assets/Images/Profile/EditProfile/edit-save.png';
import { useUserContext } from '../../../contexts/UserContext.tsx';
import Icon from '../../../shared/Icon.tsx';
import { getColor } from '../../../styles/Theme.tsx';

const EditProfileLayout = styled.main`
	width: 100%;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
`;

const HeaderContainer = styled.div`
	width: 95%;
	display: flex;
	flex-direction: row;
	justify-content: space-between;
	align-items: center;
	margin-bottom: 2.5rem;

	& h2 {
		margin: 0 auto 0 2rem;
	}
`;

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
		border: 1px solid ${getColor('darkGrey')};

		&:hover {
			cursor: pointer;
		}
	}

	& p {
		font-size: 1.2rem;
		color: ${getColor('blue')};
		margin: 1.5rem 0;

		&:hover {
			cursor: pointer;
		}
	}
`;

const EditProfileContainer = styled.div`
	width: 95%;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: flex-start;

	& label {
		color: ${getColor('grey')};
		margin-bottom: 0.4rem;
	}

	& input {
		font-size: 1.2rem;
		width: 100%;
		margin-bottom: 1rem;
		padding: 0.5rem 0;

		border: none;
		border-bottom: 1px solid ${getColor('lightGrey')};

		&:focus {
			outline: none;
		}
	}
`;

export default function Profile() {
	const { username } = useUserContext();
	const navigate = useNavigate();

	return (
		<EditProfileLayout>
			<HeaderContainer>
				<Icon
					src={editCancel}
					alt="취소"
					onClick={() => navigate(`/${username}`)}
				/>
				<h2>프로필 편집</h2>
			</HeaderContainer>
			<ProfileImageContainer>
				<img src={defaultProfile} alt="프로필 사진" />
				<p>프로필 사진 변경</p>
			</ProfileImageContainer>
			<EditProfileContainer>
				<div onClick={() => navigate('/account/edit/name')}>
					<label htmlFor="name">이름</label>
					<input type="text" id="name" />
				</div>
				<div onClick={() => navigate('/account/edit/username')}>
					<label htmlFor="nickname">사용자 이름</label>
					<input type="text" id="nickname" maxLength={30} />
				</div>
				<div onClick={() => navigate('/account/edit/bio')}>
					<label htmlFor="introduction">소개</label>
					<input type="text" id="introduction" />
				</div>
				<div onClick={() => navigate('/account/edit/link')}>링크 추가</div>
				<div onClick={() => navigate('/account/edit/gender')}>성별</div>
			</EditProfileContainer>
		</EditProfileLayout>
	);
}
