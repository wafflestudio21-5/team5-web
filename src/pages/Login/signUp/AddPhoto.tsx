import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

import { useAuthContext } from '../../../contexts/AuthContext';

const Img = styled.img`
	width: 10rem;
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
		border: 0.3rem solid whitesmoke;
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
	background-color: blue;
	color: white;
	&#skip {
		background-color: white;
		border: 1px solid gainsboro;
		color: black;
	}
`;

export default function AddPhoto() {
	const navigate = useNavigate();
	const { setIsLoggedin } = useAuthContext();
	const handleClick = () => {
		setIsLoggedin(true);
		navigate('/');
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
					src="https://eeuncontents.com/common/img/default_profile.png"
					alt="기본 프로필"
				/>
			</Div>
			<Div className="buttonPos">
				<Button className="next">사진 추가</Button>
				<Button className="next" id="skip" onClick={handleClick}>
					건너뛰기
				</Button>
			</Div>
		</>
	);
}
