import { ChangeEvent, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';

import { usePostContext } from '../../contexts/PostContext';
import PhotoPreview from '../../components/AddPost/PhotoPreview';

const Background = styled.div`
	background-color: white;
	position: fixed;
	width: 430px;
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
	width: 84%;
	font-weight: 600;
`;
const Next = styled.button`
	display: inline-block;
	width: 10%;
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
const Input = styled.input`
	display: none;
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

export default function UploadPhoto() {
	const navigate = useNavigate();
	const { files, setFiles, resetPost, previewUrls, setPreviewUrls } =
		usePostContext();
	/* 	const [isValid, setIsValid] = useState(true)
	 */
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
			/* 			setIsValid(true)
			 */ navigate('/addText');
		}
		/* 		else setIsValid(false)
		 */
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
				accept="image/*"
				multiple
				onChange={handleFileChange}
			/>
			<PhotoPreview previewUrls={previewUrls} />
			<ButtonBackground>
				<ShareButton onClick={handleClick}>사진 추가</ShareButton>
			</ButtonBackground>
		</Background>
	);
}
