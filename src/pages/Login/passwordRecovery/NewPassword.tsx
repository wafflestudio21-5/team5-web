import styled from 'styled-components';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useUserContext } from '../../../contexts/UserContext';

interface InputProps {
	isvalid: boolean;
	type: string;
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
const Div = styled.div`
	&.logout {
		width: 94%;
		margin-left: 1.5rem;
		font-size: 0.9rem;
	}
	&.text {
		width: 90%;
		margin: 0 1.5rem;
		font-size: 0.9rem;
	}
	&.notice {
		width: 90%;
		color: red;
		font-size: 0.7rem;
		margin: -0.5rem 0 0 1.5rem;
	}
`;
const Input = styled.input<InputProps>`
	&.code {
		display: block;
		width: 90%;
		height: 3rem;
		margin: 1rem auto;
		padding-left: 0.5rem;
		border-radius: 1rem;
		border: 1px solid ${({ isvalid }) => (isvalid ? 'gainsboro' : 'red')};
		background-color: whitesmoke;
	}
	&:focus {
		outline: none;
	}
`;
const Checkbox = styled.input`
	&.checkbox {
		display: inline;
		float: left;
	}
`;
const Button = styled.button`
	display: block;
	margin: 1rem auto;
	width: 93%;
	height: 2.5rem;
	border-radius: 1.2rem;
	border: none;
	background-color: blue;
	color: white;
`;

export default function NewPassword() {
	const { password, setPassword, setIsLoggedin } = useUserContext();
	const [isValid, setIsValid] = useState(true);
	const navigate = useNavigate();
	const handleClick = () => {
		if (password.length < 6) setIsValid(false);
		else {
			setIsValid(true);
			setIsLoggedin(true);
			navigate('/');
		}
	};
	return (
		<>
			<Link to="/passwordRecovery/certification">
				<Img
					src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQsl8RBI7W6MLf98a-xSu5HLLUasmcPAkIU1A&usqp=CAU"
					alt="뒤로가기"
				/>
			</Link>
			<H2>새 비밀번호 만들기</H2>
			<Div className="text">
				6자 이상의 문자와 숫자로 비밀번호를 만드세요. 계정에 로그인하려면 이
				비밀번호가 필요합니다.
			</Div>
			<Input
				isvalid={isValid}
				type="password"
				className="code"
				value={password}
				placeholder="새 비밀번호"
				onChange={(e) => setPassword(e.target.value)}
			/>
			{!isValid && (
				<Div className="notice">
					비밀번호가 너무 짧습니다. 6자 이상의 문자 또는 숫자로 비밀번호를
					만드세요.
				</Div>
			)}
			<Button onClick={handleClick}>계속</Button>
			<Div className="logout">
				<Checkbox type="checkbox" className="checkbox" />
				<Div className="logout">
					다른 기기에서 로그아웃합니다. 다른 사람이 회원님의 계정을 사용한 경우
					선택하세요.
				</Div>
			</Div>
		</>
	);
}
