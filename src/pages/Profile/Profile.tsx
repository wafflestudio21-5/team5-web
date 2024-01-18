import styled from "styled-components";
import addPost from "../../assets/Images/Profile/add-post.png";
import menu from "../../assets/Images/Profile/menu.png";
import defaultProfile from "../../assets/Images/Profile/default-profile.svg";
// import AddPostModal from '../../components/Profile/AddPostModal.tsx'
// import MenuModal from '../../components/Profile/MenuModal.tsx'
// import ProfileImageModal from '../../components/Profile/ProfileImageModal.tsx'
// import { useState } from 'react'
import { useNavigate } from "react-router-dom";

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

export default function Profile() {
  // 모달 관련
  // const [isAddPostModalOpen, setIsAddPostModalOpen] = useState(false)
  // const [isMenuModalOpen, setIsMenuModalOpen] = useState(false)
  // const [isProfileImageModalOpen, setIsProfileImageModalOpen] = useState(false)
  // const closeAddPostModal = () => {
  // 	setIsAddPostModalOpen(false)
  // }
  // const closeMenuModal = () => {
  // 	setIsMenuModalOpen(false)
  // }
  // const closeProfileImageModal = () => {
  // 	setIsProfileImageModalOpen(false)
  // }

  // 페이지 이동
  const navigate = useNavigate();

  return (
    <ProfileLayout>
      <HeaderContainer>
        <h2>dndw0</h2>
        <div>
          <img
            src={addPost}
            alt="게시글 추가"
            // onClick={() => setIsAddPostModalOpen(true)}
          />
          <img
            src={menu}
            alt="메뉴 열기"
            // onClick={() => setIsMenuModalOpen(true)}
          />
        </div>
      </HeaderContainer>

      <UserInfoContainer>
        <img
          src={defaultProfile}
          alt="프로필 사진"
          // onClick={() => setIsProfileImageModalOpen(true)}
        />
        <div>
          <h2>0</h2>
          <p>게시물</p>
        </div>
        <div>
          <h2>0</h2>
          <p>팔로워</p>
        </div>
        <div>
          <h2>0</h2>
          <p>팔로우</p>
        </div>
      </UserInfoContainer>

      <UserProfileContainer>
        <h3>최재웅</h3>
        <p>자기소개</p>
      </UserProfileContainer>

      <ProfileEditContainer>
        <button onClick={() => navigate("edit")}>프로필 편집</button>
        <button>프로필 공유</button>
      </ProfileEditContainer>

      <PostContainer>{/* <PostList /> */}</PostContainer>

      {/*	Modals */}
      {/*{isAddPostModalOpen && (*/}
      {/*	<AddPostModal*/}
      {/*		onCloseModal={closeAddPostModal}*/}
      {/*		isOpenModal={isAddPostModalOpen}*/}
      {/*	/>*/}
      {/*)}*/}
      {/*{isMenuModalOpen && <MenuModal onCloseMenuModalOpen={closeMenuModal} />}*/}
      {/*{isProfileImageModalOpen && (*/}
      {/*	<ProfileImageModal onCloseProfileImageModal={closeProfileImageModal} />*/}
      {/*)}*/}
    </ProfileLayout>
  );
}
