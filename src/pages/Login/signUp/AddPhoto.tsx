import { ChangeEvent, useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

import { useUserContext } from '../../../contexts/UserContext';
import { addProfileImage } from '../../../apis/account';
import { getColor } from '../../../styles/Theme';

const Img = styled.img`
	height: 100%;
	margin: 0 auto;
`;
const H2 = styled.h2`
	display: block;
	width: 90%;
	margin-left: 1.5rem;
`;
const Div = styled.div`
	&.text {
		width: 90%;
		margin: 0 1.5rem;
		font-size: 0.9rem;
	}
	&.buttonPos {
		width: 100%;
	}
	&.imageBox {
		overflow: hidden;
		width: 10rem;
		height: 10rem;
		border: 0.3rem solid ${getColor('whiteSmoke')};
		margin: 2rem auto;
		border-radius: 50%;
	}
`;
const Button = styled.button`
	display: block;
	margin: 1rem auto;
	width: 90%;
	height: 2.5rem;
	border-radius: 1.2rem;
	border: none;
	background-color: ${getColor('blue')};
	color: ${getColor('white')};
	&#skip {
		background-color: ${getColor('white')};
		border: 1px solid ${getColor('extraLightGrey')};
		color: ${getColor('black')};
	}
`;

export default function AddPhoto() {
	const navigate = useNavigate();
	const { accessToken, isLoggedIn, setIsLoggedIn } = useUserContext();
	const [previewImage, setPreviewImage] = useState(
		'https://upload.wikimedia.org/wikipedia/commons/thumb/2/2c/Default_pfp.svg/680px-Default_pfp.svg.png?20220226140232'
	);

	useEffect(() => {
		if (isLoggedIn) {
			navigate('/');
		}
	}, [isLoggedIn]);
	const handleClick = () => {
		setIsLoggedIn(true);
	};

	const profileImageRef = useRef<HTMLInputElement>(null);

	const onProfileImageClick = () => {
		if (profileImageRef.current) {
			profileImageRef.current.click();
		}
	};

	const handleFileChange = async (e: ChangeEvent<HTMLInputElement>) => {
		if (e.target.files && e.target.files.length > 0) {
			const file = e.target.files[0];
			const formData = new FormData();
			formData.append('file', file);

			await addProfileImage(accessToken, formData);

			if (file) {
				const reader = new FileReader();
				reader.onloadend = () => {
					setPreviewImage(reader.result as string);
				};
				reader.readAsDataURL(file);
			}
		}
	};

	return (
		<>
			<H2>프로필 사진 추가</H2>
			<Div className="text">
				친구들이 회원님을 알아볼 수 있도록 프로필 사진을 추가하세요. 프로필
				사진은 모든 사람에게 공개됩니다.
			</Div>
			<Div className="imageBox">
				<Img
					src={previewImage}
					alt="기본 프로필"
					onClick={onProfileImageClick}
				/>
			</Div>
			<Div className="buttonPos">
				<Button className="next" onClick={handleClick}>
					사진 추가
				</Button>
				<Button className="next" id="skip" onClick={handleClick}>
					건너뛰기
				</Button>
			</Div>
			<input
				type="file"
				style={{ display: 'none' }}
				ref={profileImageRef}
				accept="image/*"
				onChange={handleFileChange}
			/>
		</>
	);
}
