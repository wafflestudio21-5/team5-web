import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';

import MenuElement from '../../components/CreatePost/MenuElement';
import Select from '../../components/CreatePost/SubjectBar';
import { usePostContext } from '../../contexts/PostContext';
import { useUserContext } from '../../contexts/UserContext';

const Background = styled.div`
	background-color: white;
	position: fixed;
	width: 430px;
	height: 87%;
	overflow-y: scroll;
	z-index: 100;
	&::-webkit-scrollbar {
		display: none;
	}
`;
const Header = styled.div`
	position: fixed;
	width: 430px;
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
`;
const Container = styled.div`
	width: 100%;
	border-bottom: 1px solid gainsboro;
	padding-top: 1rem;
	overflow-x: auto;
	display: inline-flex;
	&::-webkit-scrollbar {
		display: none;
	}
`;
const ButtonBackground = styled.div`
	position: fixed;
	bottom: 0;
	border-top: 1px solid gainsboro;
	width: 430px;
	background-color: white;
	height: 5rem;
`;
const ShareButton = styled.button`
	position: fixed;
	bottom: 1rem;
	background-color: blue;
	width: 400px;
	height: 3rem;
	margin-left: 15px;
	border-radius: 0.5rem;
	border: none;
	color: white;
	font-weight: 600;
`;
const Prev = styled.img`
	width: 3%;
	margin-top: 0.3rem;
	float: left;
`;
const Photo = styled.img`
	display: block;
	width: 60%;
	margin: 2rem auto 1rem auto;
	padding: 0 0.5rem;
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
	const { userAccessToken, username } = useUserContext();
	const { files, setContent, content, tryPost } = usePostContext();
	const [previewUrls, setPreviewUrls] = useState<string[]>([]);
	if (files && files.length > 0) {
		Promise.all(
			Array.from(files).map((file) => {
				return new Promise<string>((resolve) => {
					const reader = new FileReader();
					reader.onloadend = () => {
						resolve(reader.result as string);
					};
					reader.readAsDataURL(file);
				});
			})
		).then((newPreviewUrls) => {
			setPreviewUrls(newPreviewUrls);
		});
	}
	const handleClick = async () => {
		const addr = `/${username}`;
		tryPost({ navigate, addr, userAccessToken });
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
			<Container>
				{previewUrls.map((url, index) => (
					<Photo key={index} src={url} alt="dummy" />
				))}
			</Container>
			<Textarea
				placeholder="문구를 작성하거나 설문을 추가하세요..."
				value={content}
				onChange={(e) => setContent(e.target.value)}
			/>
			<Select />
			{menuname.map((menu) => (
				<MenuElement
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
