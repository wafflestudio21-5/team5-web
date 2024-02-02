import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';

import Modal from '../../../shared/Modal/Modal';

interface InputProps {
	$isvalid: boolean;
	type: string;
	value: string;
	placeholder: string;
	onChange: React.ChangeEventHandler<HTMLInputElement>;
}

const Img = styled.img`
	&.back {
		width: 2rem;
		margin-left: 1rem;
	}
	&.X {
		position: relative;
		width: 2rem;
		margin-top: 1rem;
	}
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
	border: 1px solid ${({ $isvalid }) => ($isvalid ? 'gainsboro' : 'red')};
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
	&.background {
		position: absolute;
		left: 0;
		top: 0;
		width: 100%;
		height: 100%;
		background-color: rgba(0, 0, 0, 0.5);
	}
	&.modal {
		position: absolute;
		width: 100%;
		height: 80%;
		bottom: 0;
		border-radius: 2rem 2rem 0 0;
		background-color: white;
	}
	&.grayBar {
		position: relative;
		margin: 0.5rem auto;
		background-color: gainsboro;
		width: 3rem;
		height: 0.3rem;
		border-radius: 0.2rem;
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
		color: blue;
	}
	&.X {
		border: none;
		background-color: transparent;
		margin-left: -85%;
		margin-bottom: -2rem;
	}
`;
const Span = styled.span`
	color: blue;
`;
const A = styled.a`
	text-decoration: none;
	color: blue;
`;

type modalState = 'open' | 'closed' | 'closing';

export default function AskBirthdaySocial() {
	const [birthday, setBirthday] = useState(new Date());
	const [isValid, setIsValid] = useState(true);
	const [modal, setModal] = useState<modalState>('closed');
	const navigate = useNavigate();
	const handleClick = () => {
		if (birthday.getFullYear() < 2022) {
			navigate('/signUp/username', { state: { birthday: `${birthday}` } });
			setIsValid(true);
		} else setIsValid(false);
	};
	return (
		<>
			<Link to="/">
				<Img
					className="back"
					src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQsl8RBI7W6MLf98a-xSu5HLLUasmcPAkIU1A&usqp=CAU"
					alt="뒤로가기"
				/>
			</Link>
			<H2>생년월일 입력</H2>
			<Div className="text">
				비즈니스, 반려동물 또는 기타 목적으로 이 계정을 만드는 경우에도 회원님의
				실제 생년월일을 사용하세요. 이 생년월일 정보는 회원님이 공유하지 않는 한
				다른 사람에게 공개되지 않습니다.{' '}
				<Span className="why" onClick={() => setModal('open')}>
					왜 생년월일을 입력해야 하나요?
				</Span>
			</Div>
			<Input
				$isvalid={isValid}
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

			{modal !== 'closed' && <NoticeModal modal={modal} setModal={setModal} />}
		</>
	);
}
type Props = {
	modal: string;
	setModal: (s: modalState) => void;
};

function NoticeModal({ modal, setModal }: Props) {
	return (
		<Modal
			onBackgroundClick={() => {
				setModal('closing');
				setTimeout(() => setModal('closed'), 300);
			}}
			isClosing={modal === 'closing'}
		>
			<Div>
				<Div className="grayBar"></Div>
				<H2>생일</H2>
				<Div className="text">
					생년월일을 입력하면 회원님에게 제공되는 기능 및 광고가 개선되면
					Instagram 커뮤니티를 안전하게 유지하는 데 도움이 됩니다. 입력한
					생년월일 정보는 개인 정보 계정 설정에서 확인할 수 있습니다.
					<A href="https://privacycenter.instagram.com/"> 더 알아보기</A>
				</Div>
				<br />
				<br />
				<br />
				<br />
			</Div>
		</Modal>
	);
}
