import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';

import { useUserContext } from '../../../contexts/UserContext';

interface InputProps {
	isvalid: boolean;
	type: string; // 여기서 실제로 사용하는 타입으로 변경하세요 (예: 'text', 'password' 등)
	value: string;
	placeholder: string;
	onChange: React.ChangeEventHandler<HTMLInputElement>;
}

const Img = styled.img`
	width: 2rem;
	margin-left: 1rem;
`;
const H2 = styled.h2`
	display: block;
	width: 90%;
	margin-left: 1.5rem;
`;
const Input = styled.input<InputProps>`
	display: block;
	width: 90%;
	height: 3rem;
	margin: 1rem auto;
	border-radius: 1rem;
	padding-left: 0.5rem;
	padding-right: 0.5rem;
	border: 1px solid ${({ isvalid }) => (isvalid ? 'gainsboro' : 'red')};
	background-color: whitesmoke;
	&:focus {
		outline: none;
	}
`;
const Div = styled.div`
	&.text {
		width: 90%;
		margin: 0 1.5rem;
		font-size: 0.9rem;
	}
	&.notice {
		width: 90%;
		margin-top: -0.5rem;
		margin-left: 1.5rem;
		font-size: 0.7rem;
		color: red;
	}
`;
const Button = styled.button`
	&.next {
		display: block;
		margin: 1rem auto;
		width: 93%;
		height: 2.5rem;
		border-radius: 1.2rem;
		border: none;
		background-color: blue;
		color: white;
	}
	&.already {
		display: block;
		width: 90%;
		position: fixed;
		left: 5%;
		bottom: 1rem;
		border: none;
		background-color: white;
	}
`;

export default function AskBirthday() {
	const { birthday, setBirthday } = useUserContext();
	const [isValid, setIsValid] = useState(true);
	const navigate = useNavigate();
	const handleClick = () => {
		if (birthday.getFullYear() < 2022) {
			navigate('/signUp/username');
			setIsValid(true);
		} else setIsValid(false);
	};
	return (
		<>
			<Link to="/signUp/save">
				<Img
					src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQsl8RBI7W6MLf98a-xSu5HLLUasmcPAkIU1A&usqp=CAU"
					alt="뒤로가기"
				/>
			</Link>
			<H2>생년월일 입력</H2>
			<Div className="text">
				비즈니스, 반려동물 또는 기타 목적으로 이 계정을 만드는 경우에도 회원님의
				실제 생년월일을 사용하세요. 이 생년월일 정보는 회원님이 공유하지 않는 한
				다른 사람에게 공개되지 않습니다.
			</Div>
			<Input
				isvalid={isValid}
				type="date"
				value={birthday.toISOString().split('T')[0]}
				placeholder="생년월일"
				onChange={(e) => setBirthday(new Date(e.target.value))}
			/>
			{!isValid && (
				<Div className="notice">
					잘못된 정보를 입력한 것 같습니다. 실제 생일을 입력해주세요.
				</Div>
			)}
			<Button className="next" onClick={handleClick}>
				다음
			</Button>
			<Button className="already" onClick={() => navigate('/')}>
				이미 계정이 있으신가요?
			</Button>
		</>
	);
}
