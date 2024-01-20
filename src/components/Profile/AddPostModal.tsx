import styled, { keyframes } from "styled-components";
import reels from "../../assets/Images/NavBar/reels.png";
import post from "../../assets/Images/Profile/AddPost/post.png";
import story from "../../assets/Images/Profile/AddPost/story.png";

// 모달 fade in and out
const fadeInUp = keyframes`
  from {
    transform: translateY(20rem);
  }
  to {
    transform: translateY(0);
  }
`;

// const fadeOutDown = keyframes`
// 	from {
// 		transform: translateY(0);
// 	}
// 	to {
// 		transform: translateY(20rem);
// 	}
// `

// 모달 배경 fade in and out
const fadeInBackground = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

// const fadeOutBackground = keyframes`
// 	from {
// 		opacity: 1;
// 	}
// 	to {
// 		opacity: 0;
// 	}
// `

const AddPostModalBackground = styled.div`
  //	화면 아래에 모달 위치시키기
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: end;
  align-items: center;

  background-color: rgba(0, 0, 0, 0.5);
  z-index: 999;

  animation: ${fadeInBackground} 0.5s ease forwards;
`;

const AddPostModalContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  width: 430px;
  height: 40%;

  background-color: white;
  border-top-left-radius: 1rem;
  border-top-right-radius: 1rem;

  animation: ${fadeInUp} 0.5s ease forwards;

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
`;

const CellContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;

  width: 100%;

  & hr {
    width: 70%;
  }
`;

const Cell = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;

  width: 100%;

  &:hover {
    cursor: pointer;
  }
`;

export default function AddPostModal({
  onCloseModal,
}: {
  onCloseModal: () => void;
}) {
  return (
    <AddPostModalBackground onClick={onCloseModal}>
      <AddPostModalContainer onClick={(e) => e.stopPropagation()}>
        <h2>만들기</h2>
        <hr />
        <CellContainer>
          <Cell>
            <img src={reels} alt="릴스" />
            <p>릴스</p>
          </Cell>
          <Cell>
            <img src={post} alt="게시물" />
            <p>게시물</p>
          </Cell>
          <Cell>
            <img src={story} alt="스토리" />
            <p>스토리</p>
          </Cell>
        </CellContainer>
      </AddPostModalContainer>
    </AddPostModalBackground>
  );
}
