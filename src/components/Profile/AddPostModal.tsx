import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

import reels from '../../assets/Images/NavBar/reels.png';
import post from '../../assets/Images/Profile/AddPost/post.png';
import story from '../../assets/Images/Profile/AddPost/story.png';
import Icon from '../../shared/Icon.tsx';
import Modal from '../../shared/Modal/Modal.tsx';

const AddPostModalContainer = styled.div`
	height: 40%;

	& h2 {
		font-size: 1.5rem;
		font-weight: 500;
		margin: 1rem 0;
	}
`;

const CellContainer = styled.div`
	display: flex;
	flex-direction: column;
	align-items: flex-start;

	width: 100%;
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

type Props = {
	close: () => void;
	isClosing: boolean;
};

export default function AddPostModal({ close, isClosing }: Props) {
	const navigate = useNavigate();

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
					<hr className="content" />
					<Cell onClick={() => navigate('/addPost')}>
						<Icon src={post} alt="게시물" />
						<p>게시물</p>
					</Cell>
					<hr className="content" />
					<Cell>
						<Icon src={story} alt="스토리" />
						<p>스토리</p>
					</Cell>
					<hr className="content" />
				</CellContainer>
			</AddPostModalContainer>
		</Modal>
	);
}
