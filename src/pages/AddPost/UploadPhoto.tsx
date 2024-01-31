import { ChangeEvent } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';

import { usePostContext } from '../../contexts/PostContext';

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
	right: 1rem;
	width: 10%;
	text-align: right;
	color: blue;
	border: none;
	background-color: transparent;
	margin-left: -2rem;
`;
const Img = styled.img`
	width: 3%;
	margin-top: 0.3rem;
	float: left;
`;
const Input = styled.input`
	position: relative;
	margin: 0 auto;
`;

export default function UploadPhoto() {
	const navigate = useNavigate();
	const { files, setFiles } = usePostContext();
	const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
		setFiles(e.target.files);
	};
	return (
		<Background>
			<Header>
				<Link to="/">
					<Img
						src="https://cdn-icons-png.flaticon.com/256/75/75519.png"
						alt="취소"
					/>
				</Link>
				<Title>새 게시물</Title>
				<Next
					onClick={() => {
						files !== null && navigate('/addText');
					}}
				>
					다음
				</Next>
			</Header>
			<Input
				type="file"
				accept="image/*"
				multiple
				onChange={handleFileChange}
			/>
		</Background>
	);
}
