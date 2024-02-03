import { ChangeEvent, useEffect, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';

import PhotoPreview from '../../components/AddPost/PhotoPreview';
import { usePostContext } from '../../contexts/PostContext';

type ButtonType = {
	$isadd: boolean;
	onClick: () => void;
};

const Background = styled.div`
	background-color: white;
	margin: 0;
	padding: 0;
	width: 100%;
	height: 100%;
	z-index: 100;
`;
const Header = styled.div`
	width: 100%;
	height: 1.5rem;
	border-bottom: 1px solid gainsboro;
	padding-bottom: 0.5rem;
`;
const Title = styled.div`
	display: inline-block;
	text-align: center;
	width: 80%;
	font-weight: 600;
`;
const Next = styled.button`
	display: inline-block;
	width: 15%;
	text-align: right;
	color: blue;
	border: none;
	background-color: transparent;
	margin-left: -0.5rem;
`;
const Img = styled.img`
	width: 3%;
	margin-top: 0.3rem;
	float: left;
	margin-left: 0.8rem;
`;
const Plus = styled.img`
	width: 80%;
`;
const Input = styled.input`
	display: none;
`;
/* const ButtonBackground = styled.div`
	bottom: 0;
	border-top: 1px solid gainsboro;
	width: 100%;
	margin-top: 68%;
	background-color: white;
	height: 5rem;
	z-indev: 300;
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
`; */
const Div = styled.div`
	width: 90%;
	margin-left: 1.5rem;
	margin-top: 0.5rem;
	font-size: 0.7rem;
	color: red;
	text-align: center;
`;
const Text = styled.div`
	width: 100%;
	text-align: center;
	margin-top: 1rem;
	font-weight: 600;
`;
const Button = styled.button<ButtonType>`
	width: 18%;
	background-color: white;
	border: none;
	margin-left: ${({ $isadd }) => ($isadd ? '41%;' : '80%')};
	margin-top: ${({ $isadd }) => ($isadd ? '40%;' : '122%')};
`;

export default function UploadPhoto() {
	const navigate = useNavigate();
	const { files, setFiles, resetPost, previewUrls, setPreviewUrls } =
		usePostContext();
	const [isValid, setIsValid] = useState(true);

	const postPhotoRef = useRef<HTMLInputElement>(null);

	const onPostPhotoClick = () => {
		if (postPhotoRef.current) {
			postPhotoRef.current.click();
		}
	};

	useEffect(() => {
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
	}, [files]);

	const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
		setFiles(e.target.files);
	};

	const handleClick = () => {
		if (files) {
			setIsValid(true);
			navigate('/addText');
		} else setIsValid(false);
	};
	return (
		<Background>
			<Header>
				<Link to="/">
					<Img
						src="https://cdn-icons-png.flaticon.com/256/75/75519.png"
						alt="취소"
						onClick={resetPost}
					/>
				</Link>
				<Title>새 게시물</Title>
				<Next onClick={handleClick}>다음</Next>
			</Header>
			<Input
				type="file"
				ref={postPhotoRef}
				accept="image/*"
				multiple
				onChange={handleFileChange}
			/>
			<PhotoPreview previewUrls={previewUrls} />
			{files === null ? (
				<Button $isadd={files === null} onClick={onPostPhotoClick}>
					<Plus
						src={'https://cdn-icons-png.flaticon.com/256/107/107075.png'}
						alt="사진 추가"
					/>
					<Text>사진 추가</Text>
				</Button>
			) : (
				<></>
			)}
			{!isValid && <Div>사진을 한 장 이상 추가해주세요.</Div>}
			{/* 			<ButtonBackground>
				<ShareButton onClick={handleClick}>사진 추가</ShareButton>
			</ButtonBackground>
 */}{' '}
		</Background>
	);
}
