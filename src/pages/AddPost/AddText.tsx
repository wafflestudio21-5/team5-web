import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';

import { fetchUserInformation } from '../../apis/account';
import { resetAccessToken } from '../../apis/login.ts';
import { tryPost } from '../../apis/post';
import MenuElement from '../../components/AddPost/MenuElement.tsx';
import PhotoPreviewInorder from '../../components/AddPost/PhotoPreviewInorder';
import SubjectBar from '../../components/AddPost/SubjectBar';
import { usePostContext } from '../../contexts/PostContext';
import { useUserContext } from '../../contexts/UserContext';

const Background = styled.div`
	background-color: white;
	margin: 0;
	padding: 0;
	width: 100%;
	height: 100%;
	overflow-y: scroll;
	z-index: 100;
	&::-webkit-scrollbar {
		display: none;
	}
`;
const Header = styled.div`
	width: 100%;
	height: 1.5rem;
	background-color: white;
	border-bottom: 1px solid gainsboro;
	padding-bottom: 0.5rem;
`;
const Title = styled.div`
	display: inline-block;
	text-align: center;
	width: 81%;
	font-weight: 600;
	margin-left: 1rem;
`;
const ButtonBackground = styled.div`
	position: fixed;
	bottom: 0;
	border-top: 1px solid gainsboro;
	width: 430px;
	background-color: white;
	height: 5rem;
	z-index: 100;
`;
const ShareButton = styled.button`
	bottom: 1rem;
	background-color: blue;
	width: 86%;
	height: 3rem;
	margin-top: 1rem;
	margin-left: 7%;
	border-radius: 0.5rem;
	border: none;
	color: white;
	font-weight: 600;
`;
const Prev = styled.img`
	width: 3%;
	margin-top: 0.3rem;
	margin-left: 0.5rem;
	float: left;
`;
const Textarea = styled.textarea`
	width: 100%;
	height: 4rem;
	border: none;
	margin-top: 1rem;
	margin-bottom: 0;
	border-bottom: 1px solid gainsboro;
	resize: none;
	outline: none;
	font-family: 'Noto Sans KR', sans-serif;
`;

export default function AddText() {
	const navigate = useNavigate();
	const { accessToken, username, currentUser, setCurrentUser } =
		useUserContext();
	const { files, setContent, content, category, resetPost, fileOrder } =
		usePostContext();
	const { previewUrls } = usePostContext();
	const [isClicked, setIsClicked] = useState(true);
	const handleClick = async () => {
		if (category) {
			const newAccessToken = await resetAccessToken();
			console.log(newAccessToken);
			const addr = `/${username}`;
			if (files !== null && category !== null) {
				const response = await tryPost({
					content,
					files,
					category,
					fileOrder,
					accessToken,
				});
				if (response) {
					await fetchUserInformation(accessToken, currentUser, setCurrentUser);
					navigate(addr);
				}
			}
			resetPost();
		} else {
			setIsClicked(false);
		}
	};
	const menuname = [
		'사람 태그',
		'음악 추가',
		'알림 추가',
		'공개 대상',
		'위치 추가',
		'고급 설정',
	];
	return (
		<Background>
			<Header>
				<Link to="/addPost">
					<Prev
						src="https://cdn-icons-png.flaticon.com/512/271/271220.png"
						alt="취소"
					/>
				</Link>
				<Title>새 게시물</Title>
			</Header>
			<PhotoPreviewInorder previewUrls={previewUrls} />
			<Textarea
				placeholder="문구를 작성하거나 설문을 추가하세요..."
				value={content}
				onChange={(e) => setContent(e.target.value)}
			/>
			<SubjectBar isClicked={isClicked} />
			{menuname.map((menu, index) => (
				<MenuElement
					key={index}
					title={menu}
					icon="https://mblogthumb-phinf.pstatic.net/MjAxOTAzMTlfMzkg/MDAxNTUzMDAxODEwMzk5.8pXP3XjvzjUzNV86zV796kuswjQOSkKw9L1jLCb9a7og.2HnP8pqAH9bkFMFsWTUV_B69LEoey1624U2_1BGynaYg.PNG.urbanstars/glyph-logo_May2016.png?type=w800"
				/>
			))}
			<br />
			<br />
			<br />
			<br />
			<ButtonBackground>
				<ShareButton onClick={handleClick}>공유</ShareButton>
			</ButtonBackground>
		</Background>
	);
}
