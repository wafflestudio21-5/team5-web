import { ChangeEvent, useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

import PhotoPreview from '../../components/AddPost/PhotoPreview';
import { usePostContext } from '../../contexts/PostContext';
import CancelHeader from '../../shared/Header/CancelHeader.tsx';

type ButtonType = {
	$isAdd: boolean;
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
const Plus = styled.img`
	width: 80%;
`;
const Input = styled.input`
	display: none;
`;
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
	margin-left: ${({ $isAdd }) => ($isAdd ? '41%;' : '80%')};
	margin-top: ${({ $isAdd }) => ($isAdd ? '40%;' : '122%')};
`;

export default function UploadPhoto() {
	const navigate = useNavigate();
	const { files, setFiles, previewUrls, setPreviewUrls } = usePostContext();
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
			<CancelHeader title="새 게시물" onClickSave={handleClick} customURL="/" />
			<Input
				type="file"
				ref={postPhotoRef}
				accept="image/*"
				multiple
				onChange={handleFileChange}
			/>
			<PhotoPreview previewUrls={previewUrls} />
			{files === null ? (
				<Button $isAdd={true} onClick={onPostPhotoClick}>
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
		</Background>
	);
}
