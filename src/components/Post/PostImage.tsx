import styled from 'styled-components';

import { PostType } from '../../types';

const Container = styled.div`
	position: relative;
	width: 100%;
	top: 0;
	left: 0;
	box-sizing: border-box;
	display: flex;
`;

const Image = styled.img`
	width: 100%;
	position: relative;
`;

// 이미지가 여러 개 있을 때 보이는 좌우 이동 버튼과 인덱스 표시 수평점
// 여러 이미지를 받을 지 결정이 안되어서 주석처리 함.

// const MoveButton = styled.button`
// 	position: absolute;
// 	top: calc(50% - 0.625rem);
// 	width: 1.25rem;
// 	height: 1.25rem;
// 	padding: 0;
// 	border-radius: 70%;
// 	border: 0;
// 	background-color: rgba(245, 245, 245, 0.7);
// 	color: black;
// 	&.left {
// 		left: 1rem;
// 	}
// 	&.right {
// 		right: 1rem;
// 	}
// `

// const IndexBar = styled.div`
// 	position: absolute;
// 	width: 100%;
// 	height: fit-content;
// 	bottom: 1rem;
// 	left: 0;
// 	padding: 0;
// 	display: flex;
// 	flex-direction: row;
// 	justify-content: center;
// 	& .dot {
// 		width: 0.375rem;
// 		height: 0.375rem;
// 		border-radius: 50%;
// 		background-color: rgba(255, 255, 255, 0.4);
// 		margin-right: 0.25rem;
// 	}
// 	& .select {
// 		background-color: rgb(255, 255, 255);
// 		margin-right: 0;
// 	}
// `

export default function PostImage({
	imageUrl,
}: {
	imageUrl: PostType['imageUrl'];
}) {
	return (
		<Container>
			<Image src={imageUrl} alt="post image" />
			{/* <MoveButton className="left">&lt;</MoveButton>
			<MoveButton className="right">&gt;</MoveButton>
			<IndexBar>
				<div className="dot"></div>
				<div className="dot"></div>
				<div className="dot select"></div>
			</IndexBar> */}
		</Container>
	);
}
