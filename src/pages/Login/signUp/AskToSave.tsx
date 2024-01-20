import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';

import { useUserContext } from '../../../contexts/UserContext';

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
	&.notice {
		width: 94%;
		margin-left: 1.5rem;
	}
	&.text {
		width: 90%;
		margin: 0 1.5rem;
		font-size: 0.9rem;
	}
`;
const Button = styled.button`
	&.save {
		display: block;
		margin: 1rem auto;
		width: 93%;
		height: 2.5rem;
		border-radius: 1.2rem;
		border: none;
		background-color: blue;
		color: white;
	}
	&.later {
		display: block;
		margin: 1rem auto;
		width: 93%;
		height: 2.5rem;
		border-radius: 1.2rem;
		background-color: white;
		border: 1px solid gainsboro;
		color: black;
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
`;

export default function AskToSave() {
	const { name, setIsSaved } = useUserContext();
	const navigate = useNavigate();
	const handleClick = (b: boolean) => {
		navigate('/signUp/birthday');
		setIsSaved(b);
	};
	return (
		<>
			<Link to="/signUp/password">
				<Img
					src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQsl8RBI7W6MLf98a-xSu5HLLUasmcPAkIU1A&usqp=CAU"
					alt="뒤로가기"
				/>
			</Link>
			<H2>로그인 정보를 저장하시겠어요?</H2>
			<Div className="text">
				{name} 로그인 정보가 저장되므로 다음에 로그인할 때 iCloud® 기기에서
				로그인 정보를 다시 입력하지 않아도 됩니다.
			</Div>
			<Button className="save" onClick={() => handleClick(true)}>
				저장
			</Button>
			<Button className="later" onClick={() => handleClick(false)}>
				나중에 하기
			</Button>
			<Button className="already" onClick={() => navigate('/')}>
				이미 계정이 있으신가요?
			</Button>
		</>
	);
}
