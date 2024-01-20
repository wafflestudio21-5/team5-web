import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

import addPost from '../../assets/Images/Profile/add-post.png';
import defaultProfile from '../../assets/Images/Profile/default-profile.svg';
import menu from '../../assets/Images/Profile/menu.png';
import AddPostModal from '../../components/Profile/AddPostModal.tsx';
import MenuModal from '../../components/Profile/MenuModal.tsx';
import ToggleBar from '../../components/Profile/ToggleBar.tsx';
import Icon from '../../shared/Icon.tsx';

const ProfileLayout = styled.main`
	width: 100%;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
`;

const HeaderContainer = styled.div`
	width: 100%;
	display: flex;
	flex-direction: row;
	justify-content: space-between;
	align-items: center;
	margin-bottom: 1.5rem;

	& h2 {
		margin: 0 1rem;
	}

	& img {
		height: 1.7rem;
		width: 1.7rem;
		margin-right: 1rem;

		&:hover {
			cursor: pointer;
		}
	}
`;

// 사진, 게시물, 팔로워, 팔로잉
const UserInfoContainer = styled.div`
	width: 100%;
	display: flex;
	flex-direction: row;
	justify-content: center;
	align-items: center;

	// 프로필 사진
	& img {
		height: 6rem;
		width: 6rem;
		border-radius: 50%;
		margin: 0 1rem;

		&:hover {
			cursor: pointer;
		}
	}

	// 게시물, 팔로워, 팔로잉과 숫자 담는 div
	& div {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		margin: 0 1.5rem;

		&:hover {
			cursor: pointer;
		}

		// 숫자
		& h2 {
			font-size: 1.5rem;
			margin: 0;
		}

		// 게시물, 팔로워, 팔로잉
		& p {
			font-size: 1rem;
			margin: 0;
		}
	}
`;

// 이름, 소개
const UserProfileContainer = styled.div`
	width: 100%;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: flex-start;
	margin-bottom: 1rem;

	& h3 {
		margin: 0.5rem 1rem 0 1rem;
		font-weight: 500;
	}

	& p {
		margin: 0.5rem 1rem 0 1rem;
	}
`;

const ProfileEditContainer = styled.div`
	width: 100%;
	display: flex;
	flex-direction: row;
	justify-content: center;
	align-items: center;
	margin-bottom: 2rem;

	& button {
		width: 45%;
		margin: 0.5rem;

		font-size: 1rem;
		font-weight: 500;
		padding: 0.5rem 1rem;

		border: none;
		border-radius: 0.5rem;

		&:hover {
			cursor: pointer;
		}
	}
`;

const PostContainer = styled.div`
	width: 100%;
	display: flex;
	flex-direction: row;
	justify-content: space-between;
	align-items: center;
`;

// 모달 상태 관리
type AddPostModalState = 'open' | 'closed' | 'closing';
type MenuModalState = 'open' | 'closed' | 'closing';

export default function Profile() {
	// 모달 관련
	const [addPostModal, setAddPostModal] = useState<AddPostModalState>('closed');
	const [menuModal, setMenuModal] = useState<MenuModalState>('closed');

	// 페이지 이동
	const navigate = useNavigate();

	// ToggleBar 탭 상태 관리
	const [activeTab, setActiveTab] = useState<'left' | 'right'>('left');

	return (
		<ProfileLayout>
			<HeaderContainer>
				<h2>dndw0</h2>
				<div>
					<Icon
						src={addPost}
						alt="게시글 추가"
						onClick={() => setAddPostModal('open')}
					/>
					<Icon
						src={menu}
						alt="메뉴 추가"
						onClick={() => setMenuModal('open')}
					/>
				</div>
			</HeaderContainer>
			<UserInfoContainer>
				<img src={defaultProfile} alt="프로필 사진" />
				<div>
					<h2>0</h2>
					<p>게시물</p>
				</div>
				<div onClick={() => navigate('/id/followers')}>
					<h2>0</h2>
					<p>팔로워</p>
				</div>
				<div onClick={() => navigate('/id/following')}>
					<h2>0</h2>
					<p>팔로잉</p>
				</div>
			</UserInfoContainer>
			<UserProfileContainer>
				<h3>최재웅</h3>
				<p>자기소개</p>
			</UserProfileContainer>
			<ProfileEditContainer>
				<button onClick={() => navigate('/id/edit')}>프로필 편집</button>
				<button>프로필 공유</button>
			</ProfileEditContainer>
			<PostContainer>
				<ToggleBar
					leftTab={<Icon src={menu} />}
					rightTab={<Icon src={addPost} />}
					activeTab={activeTab}
					setActiveTab={setActiveTab}
				>
					<div>포스트</div>
					<div>태그됨</div>
				</ToggleBar>
			</PostContainer>

			{/*	Modals */}
			{addPostModal !== 'closed' && (
				<AddPostModal
					close={() => {
						setAddPostModal('closing');
						setTimeout(() => setAddPostModal('closed'), 300);
					}}
					isClosing={addPostModal === 'closing'}
				/>
			)}
			{menuModal !== 'closed' && (
				<MenuModal
					close={() => {
						setMenuModal('closing');
						setTimeout(() => setMenuModal('closed'), 300);
					}}
					isClosing={menuModal === 'closing'}
				/>
			)}
		</ProfileLayout>
	);
}
