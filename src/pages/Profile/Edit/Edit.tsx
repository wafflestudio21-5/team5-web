import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

import ProfileImageModal from '../../../components/Profile/ProfileImageModal.tsx';
import { useUserContext } from '../../../contexts/UserContext.tsx';
import BackHeader from '../../../shared/BackHeader.tsx';
import { getColor } from '../../../styles/Theme.tsx';
import { modalStateType } from '../../../types.ts';

const EditProfileLayout = styled.main`
	width: 100%;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
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
		font-size: 1.1rem;
		font-weight: 500;
		color: ${getColor('blue')};
		margin: 1.5rem 0;

		&:hover {
			cursor: pointer;
		}
	}
`;

const EditProfileContainer = styled.div`
	width: 90%;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: flex-start;
`;

const Cell = styled.div`
	width: 100%;

	&.link {
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		align-items: center;

		& p {
			color: ${getColor('black')};
			font-size: 1.2rem;
		}

		& p.linkCount {
			color: ${getColor('grey')};
			font-size: 1rem;
		}
	}

	& p.label {
		color: ${getColor('grey')};
		margin-bottom: 0;
		font-size: 0.9rem;
	}

	& p.content {
		font-size: 1.2rem;
		width: 100%;
		margin: 0.2rem 0 0.5rem 0;
		padding: 0.5rem 0;

		border: none;
		border-bottom: 1px solid ${getColor('lightGrey')};

		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;

		&:focus {
			outline: none;
		}

		&:hover {
			cursor: pointer;
		}
	}

	&:hover {
		cursor: pointer;
	}
`;

export default function Edit() {
	const {
		profileImageUrl,
		name,
		username,
		bio,
		userLinks,
		gender,
		isCustomGender,
	} = useUserContext();
	const navigate = useNavigate();

	// 프로필 이미지 관련
	const [profileImageModal, setProfileImageModal] =
		useState<modalStateType>('closed');

	// 성별 관련
	const selectedGender = (gender: string, isCustomGender: boolean) => {
		if (isCustomGender) {
			return gender;
		}

		switch (gender) {
			case 'unknown':
				return '밝히고 싶지 않음';
			case 'male':
				return '남성';
			default:
				return '여성';
		}
	};

	return (
		<EditProfileLayout>
			<BackHeader title="프로필 편집" backURL={`/${username}`} />
			<ProfileImageContainer onClick={() => setProfileImageModal('open')}>
				<img src={profileImageUrl} alt="프로필 사진" />
				<p>프로필 사진 변경</p>
			</ProfileImageContainer>
			<EditProfileContainer>
				<Cell onClick={() => navigate('/account/edit/name')}>
					<p className="label">이름</p>
					<p className="content">{name}</p>
				</Cell>
				<Cell onClick={() => navigate('/account/edit/username')}>
					<p className="label">사용자 이름</p>
					<p className="content">{username}</p>
				</Cell>
				<Cell onClick={() => navigate('/account/edit/bio')}>
					<p className="label">소개</p>
					<p className="content">{bio}</p>
				</Cell>
				<Cell className="link" onClick={() => navigate('/account/edit/link')}>
					<p>링크</p>
					<p className="linkCount">{userLinks.length}</p>
				</Cell>
				<Cell onClick={() => navigate('/account/edit/gender')}>
					<p className="label">성별</p>
					<p className="content">{selectedGender(gender, isCustomGender)}</p>
				</Cell>
			</EditProfileContainer>

			{/*	프로필 이미지 모달 */}
			{profileImageModal !== 'closed' && (
				<ProfileImageModal
					close={() => {
						setProfileImageModal('closing');
						setTimeout(() => setProfileImageModal('closed'), 300);
					}}
					isClosing={profileImageModal === 'closing'}
				/>
			)}
		</EditProfileLayout>
	);
}
