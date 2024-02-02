import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

import { fetchUserInformation } from '../../apis/account';
import { tryPost } from '../../apis/post';
import MenuElement from '../../components/AddPost/MenuElement.tsx';
import PhotoPreviewInorder from '../../components/AddPost/PhotoPreviewInorder';
import SubjectBar from '../../components/AddPost/SubjectBar';
import { usePostContext } from '../../contexts/PostContext';
import { useUserContext } from '../../contexts/UserContext';
import BackHeader from '../../shared/Header/BackHeader.tsx';
import { getColor } from '../../styles/Theme.tsx';

const Background = styled.div`
	background-color: ${getColor('white')};
	position: fixed;
	height: 87%;
	overflow-y: scroll;
	z-index: 100;
	&::-webkit-scrollbar {
		display: none;
	}
`;
const ButtonBackground = styled.div`
	position: fixed;
	bottom: 0;
	border-top: 1px solid ${getColor('extraLightGrey')};
	width: 430px;
	background-color: ${getColor('white')};
	height: 5rem;
`;
const ShareButton = styled.button`
	bottom: 1rem;
	background-color: ${getColor('blue')};
	width: 86%;
	height: 3rem;
	margin-top: 1rem;
	margin-left: 7%;
	border-radius: 0.5rem;
	border: none;
	color: ${getColor('white')};
	font-weight: 600;
`;
const Textarea = styled.textarea`
	width: 100%;
	height: 4rem;
	border: none;
	margin-top: 1rem;
	margin-bottom: 0;
	border-bottom: 1px solid ${getColor('extraLightGrey')};
	resize: none;
	outline: none;
	font-family: 'Noto Sans KR', sans-serif;
`;
const Div = styled.div`
	width: 90%;
	margin: 0.3rem 0.5rem 0.5rem;
	font-size: 0.7rem;
	color: red;
`;

export default function AddText() {
	const navigate = useNavigate();
	const { accessToken, username, currentUser, setCurrentUser } =
		useUserContext();
	const { files, setContent, content, category, resetPost, fileOrder } =
		usePostContext();
	const { previewUrls } = usePostContext();
	const [isClicked, setIsClicked] = useState(true);
	const [noContent, setNoContent] = useState(false);

	const handleClick = async () => {
		if (category === null) setIsClicked(false);
		if (content.length === 0) setNoContent(true);
		if (category && content.length > 0) {
			const addr = `/${username}`;
			if (files !== null) {
				setIsClicked(true);
				setNoContent(false);
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
	const menuName = [
		'사람 태그',
		'음악 추가',
		'알림 추가',
		'공개 대상',
		'위치 추가',
		'고급 설정',
	];
	return (
		<Background>
			<BackHeader title="새 게시물" backURL={-1} />
			<PhotoPreviewInorder previewUrls={previewUrls} />
			<Textarea
				placeholder="문구를 작성하거나 설문을 추가하세요..."
				value={content}
				onChange={(e) => setContent(e.target.value)}
			/>
			{noContent && <Div>문구를 작성해주세요.</Div>}
			<SubjectBar isClicked={isClicked} />
			{menuName.map((menu, index) => (
				<MenuElement
					key={index}
					title={menu}
					icon="https://mblogthumb-phinf.pstatic.net/MjAxOTAzMTlfMzkg/MDAxNTUzMDAxODEwMzk5.8pXP3XjvzjUzNV86zV796kuswjQOSkKw9L1jLCb9a7og.2HnP8pqAH9bkFMFsWTUV_B69LEoey1624U2_1BGynaYg.PNG.urbanstars/glyph-logo_May2016.png?type=w800"
				/>
			))}
			<ButtonBackground>
				<ShareButton onClick={handleClick}>공유</ShareButton>
			</ButtonBackground>
		</Background>
	);
}
