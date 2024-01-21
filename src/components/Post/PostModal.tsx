// import styled from 'styled-components';

// import Modal from '../../shared/Modal/Modal.tsx';

// import PostHeader from './PostHeader.tsx';
// import PostImage from './PostImage.tsx';
// import ReactSection from './ReactSection.tsx';

// type Props = {
// 	close: () => void;
// 	isClosing: boolean;
// 	postId: number | null;
// };

// const ModalWrapper = styled.div`
// 	display: flex;
// 	flex-direction: row;
// 	width: 75%;
// 	height: 90%;
// 	background-color: white;
// `;

// const SideBar = styled.div`
// 	border-left: 1px solid gray;
// 	display: flex;
// 	flex-direction: column;
// 	& PostHeader {
// 		border-bottom: 1px solid gray;
// 	}
// 	width: 30rem;
// 	padding: 1rem;
// `;

// export default function PostModal({ close, isClosing, postId }: Props) {
// 	return (
// 		postId && (
// 			<Modal isClosing={isClosing} onBackgroundClick={close}>
// 				<ModalWrapper>
// 					<PostImage />
// 					<SideBar>
// 						<PostHeader />
// 						<ReactSection postId={postId} />
// 					</SideBar>
// 				</ModalWrapper>
// 			</Modal>
// 		)
// 	);
// }
