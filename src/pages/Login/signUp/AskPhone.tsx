import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import styled from 'styled-components';

import { useAuthContext } from '../../../contexts/AuthContext';
import { getColor } from '../../../styles/Theme';

interface InputProps {
	$isvalid: boolean;
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
	width: 90%;
	height: 3rem;
	margin: 1rem auto;
	padding-left: 0.5rem;
	border-radius: 1rem;
	border: 1px solid
		${({ $isvalid }) =>
			$isvalid ? getColor('extraLightGrey') : getColor('red')};
	background-color: ${getColor('whitesmoke')};
	&:focus {
		outline: none;
	}
`;
const Div = styled.div`
	&.notice {
		width: 90%;
		font-size: 0.7rem;
		margin-left: 1.5rem;
		margin-top: -0.5rem;
		color: ${getColor('red')};
	}
	&.text {
		width: 90%;
		margin: 0 1.5rem;
		font-size: 0.9rem;
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
		background-color: ${getColor('blue')};
		color: ${getColor('white')};
	}
	&.option {
		display: block;
		margin: 1rem auto;
		width: 93%;
		height: 2.5rem;
		border-radius: 1.2rem;
		border: 1px solid ${getColor('extraLightGrey')};
		background-color: ${getColor('white')};
		color: ${getColor('black')};
	}
	&.already {
		display: block;
		width: 90%;
		position: fixed;
		left: 5%;
		bottom: 1rem;
		border: none;
		background-color: ${getColor('white')};
		color: ${getColor('blue')};
	}
`;

export default function AskPhone() {
	const navigate = useNavigate();
	const { email, setEmail } = useAuthContext();
	const [isValid, setIsValid] = useState(true);
	const handleClick = () => {
		const phoneRegex = /^010\d{8}$/;
		if (phoneRegex.test(email)) {
			setIsValid(true);
			navigate('/signUp/certification');
		} else setIsValid(false);
	};
	return (
		<>
			<Link to="/signUp/username">
				<Img
					src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQsl8RBI7W6MLf98a-xSu5HLLUasmcPAkIU1A&usqp=CAU"
					alt="뒤로가기"
				/>
			</Link>
			<H2>휴대폰 번호 입력</H2>
			<Div className="text">
				회원님에게 연락할 수 있는 휴대폰 번호를 입력하세요. 이 휴대폰 번호는
				프로필에서 다른 사람에게 공개되지 않습니다.
			</Div>
			<Input
				$isvalid={isValid}
				type="text"
				value={email}
				placeholder="휴대폰 번호"
				onChange={(e) => setEmail(e.target.value)}
			/>
			{!isValid && (
				<Div className="notice">
					휴대폰 번호가 정확하지 않습니다. 국가 번호를 포함한 전체 휴대폰 번호를
					입력해주세요.
				</Div>
			)}
			<Button className="next" onClick={handleClick}>
				다음
			</Button>
			<Button className="option" onClick={() => navigate('/signUp/email')}>
				이메일 주소로 가입하기
			</Button>
			<Button className="already" onClick={() => navigate('/')}>
				이미 계정이 있으신가요?
			</Button>
		</>
	);
}
