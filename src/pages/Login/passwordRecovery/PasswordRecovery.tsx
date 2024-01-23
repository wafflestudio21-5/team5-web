// import { useState } from 'react'
import styled from 'styled-components';
import { Link, useNavigate } from 'react-router-dom';
import { useAuthContext } from '../../../contexts/AuthContext';

const Img = styled.img`
	width: 2rem;
	margin-left: 1rem;
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
	&#link {
		text-align: center;
	}
`;
const Input = styled.input`
	display: block;
	width: 90%;
	height: 3rem;
	margin: 1rem auto;
	padding-left: 0.5rem;
	border-radius: 1rem;
	border: 1px solid gainsboro;
	background-color: whitesmoke;
	&:focus {
		outline: none;
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
`;

export default function Login() {
	const { username, setUsername } = useAuthContext();
	const navigate = useNavigate();
	const onClick = () => {
		if (username !== '') navigate('certification/');
	};
	return (
		<>
			<Link to="/">
				<Img
					src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQsl8RBI7W6MLf98a-xSu5HLLUasmcPAkIU1A&usqp=CAU"
					alt="뒤로가기"
				/>
			</Link>
			<H2>내 계정 찾기</H2>
			<Div className="text">사용자 이름 또는 이메일 주소를 입력하세요.</Div>
			<Div className="text">비밀번호를 재설정할 수 없나요?</Div>
			<Input
				type="text"
				value={username}
				placeholder="사용자 이름 또는 이메일 주소"
				onChange={(e) => setUsername(e.target.value)}
			/>
			<Div className="text">
				보안 및 로그인 목적으로 Facebook이 보내는 WhatsApp 및 SMS 알림을 수신할
				수 있습니다.
			</Div>
			<Button onClick={onClick}>계정 찾기</Button>
			<Div className="text" id="link">
				이메일 주소로 검색
			</Div>
		</>
	);
}
