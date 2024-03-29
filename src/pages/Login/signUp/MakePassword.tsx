import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';

import { useAuthContext } from '../../../contexts/AuthContext';

interface InputProps {
	$issixormore: boolean;
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
const Input = styled.input<InputProps>`
	display: block;
	width: 100%;
	height: 3rem;
	margin-left: -0.3rem;
	padding-left: 0.5rem;
	border-radius: 1rem;
	border: 1px solid
		${({ $issixormore }) => ($issixormore ? 'gainsboro' : 'red')};
	background-color: whitesmoke;
	&:focus {
		outline: none;
	}
`;
const Div = styled.div`
	&.notice {
		width: 90%;
		margin-left: 1.5rem;
		margin-top: -0.5rem;
		font-size: 0.7rem;
		color: red;
	}
	&.text {
		width: 90%;
		margin: 0 1.5rem;
		font-size: 0.9rem;
	}
	&.inputBox {
		width: 90%;
		height: 3rem;
		position: relative;
		margin: 1rem auto;
		background-color: white;
	}
`;
const Button = styled.button`
	&.next {
		display: block;
		margin: 1rem auto;
		width: 92%;
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
		color: blue;
	}
	&.password {
		border: none;
		background-color: transparent;
		position: absolute;
		top: 0.5rem;
		right: 0.5rem;
	}
`;

export default function MakePassword() {
	const { password, setPassword } = useAuthContext();
	const navigate = useNavigate();
	const [isSixOrMore, setIsSixOrMore] = useState(true);
	const [isVisible, setIsVisible] = useState(false);
	const pwdReg = /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,15}$/;
	const eyeAddr = isVisible
		? 'https://freeiconshop.com/wp-content/uploads/edd/eye-outline.png'
		: 'https://cdn.iconscout.com/icon/free/png-256/free-eye-slash-3604201-3003511.png';
	const handleChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
		setPassword(e.target.value);
	};
	const handleClick = () => {
		if (pwdReg.test(password)) {
			setIsSixOrMore(true);
			navigate('/signUp/save');
		} else {
			setIsSixOrMore(false);
		}
	};
	return (
		<>
			<Link to="/signUp">
				<Img
					src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQsl8RBI7W6MLf98a-xSu5HLLUasmcPAkIU1A&usqp=CAU"
					alt="뒤로가기"
				/>
			</Link>
			<H2>비밀번호 만들기</H2>
			<Div className="text">
				다른 사람이 추측할 수 없는 영어, 숫자, 특수문자를 포함한 8~15 길이의
				문자열로 비밀번호를 만드세요.
			</Div>
			<Div className="inputBox">
				<form>
					{isVisible ? (
						<Input
							$issixormore={isSixOrMore}
							type="text"
							id="password"
							value={password}
							placeholder="비밀번호"
							onChange={handleChange}
						/>
					) : (
						<Input
							$issixormore={isSixOrMore}
							type="password"
							id="password"
							value={password}
							placeholder="비밀번호"
							onChange={handleChange}
						/>
					)}
				</form>
				<Button className="password" onClick={() => setIsVisible(!isVisible)}>
					<Img src={eyeAddr} alt="visible" />
				</Button>
			</Div>
			{!isSixOrMore && (
				<Div className="notice">
					비밀번호는 영어, 숫자, 특수문자를 포함한 8~15 길이의 문자열로
					입력해주세요.
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
