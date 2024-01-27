import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';

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
	&.text {
		width: 90%;
		margin: 0 1.5rem;
		font-size: 0.9rem;
	}
	&.notice {
		width: 90%;
		margin: -0.5rem 0 0 1.5rem;
		font-size: 0.7rem;
		color: red;
	}
	&#link {
		margin: 0 auto;
		text-align: center;
	}
`;
const Input = styled.input<InputProps>`
	display: block;
	width: 90%;
	height: 3rem;
	margin: 1rem auto;
	padding-left: 0.5rem;
	border-radius: 1rem;
	border: 1px solid ${({ isvalid }) => (isvalid ? 'gainsboro' : 'red')};
	background-color: whitesmoke;
	&:focus {
		outline: none;
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

export default function Certification() {
	const [code, setCode] = useState('');
	const [isValid, setIsValid] = useState(true);
	const navigate = useNavigate();
	const handleClick = () => {
		if (code.length === 6) {
			setIsValid(true);
			navigate('/passwordRecovery/newPassword');
			setIsValid(false);
		} else setIsValid(false);
	};
	return (
		<>
			<Link to="/passwordRecovery">
				<Img
					src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQsl8RBI7W6MLf98a-xSu5HLLUasmcPAkIU1A&usqp=CAU"
					alt="뒤로가기"
				/>
			</Link>
			<H2>계정 확인</H2>
			<Div className="text">
				SMS로 코드를 보내드렸습니다. 계정 확인을 위해 코드를 입력하세요.
			</Div>
			<Div className="text">계정을 확인할 수 없으신가요?</Div>
			<Input
				isvalid={isValid}
				type="number"
				value={code}
				placeholder="코드 입력"
				onChange={(e) => setCode(e.target.value)}
			/>
			{!isValid && (
				<Div className="notice">
					정확한 코드를 입력했는지 확인하고 다시 시도하세요.
				</Div>
			)}
			<Button onClick={handleClick}>계속</Button>
			<Div className="text" id="link">
				코드 다시 받기
			</Div>
		</>
	);
}
