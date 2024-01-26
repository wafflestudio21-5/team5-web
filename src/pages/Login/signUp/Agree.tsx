import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { useEffect, useState } from 'react';
import { tryLogin, trySignUp } from '../../../apis/login';
import { useAuthContext } from '../../../contexts/AuthContext';
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
const H4 = styled.h4`
	display: inline;
`;
const Div = styled.div`
	&.text {
		width: 90%;
		margin: 0 1.5rem;
		font-size: 0.9rem;
	}
	&.line {
		width: 93%;
		text-align: center;
		border-bottom: 1px solid #aaa;
		line-height: 0.1rem;
		margin: 0 auto 0 auto;
	}
	&.box {
		position: relative;
		margin: auto;
		border: none;
		width: 90%;
		height: 2.8rem;
		padding: 0.5rem;
		background-color: whitesmoke;
		border-radius: 1rem 1rem 0 0;
		font-size: 0.9rem;
	}
	&.container {
		width: 90%;
		margin: 0 auto 0.5rem;
		border: transparent;
	}
	&#first {
		border-radius: 1rem 1rem 0 0;
	}
	&#second {
		border-radius: 0;
	}
	&#third {
		border-radius: 0 0 1rem 1rem;
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
	&.option {
		display: block;
		margin: 1rem auto;
		width: 93%;
		height: 2.5rem;
		border-radius: 1.2rem;
		border: 1px solid gainsboro;
		background-color: white;
		color: black;
	}
	&.already {
		position: absolute;
		display: block;
		margin: 0 auto;
		width: 90%;
		left: 5%;
		bottom: 1rem;
		border: none;
		background-color: white;
		color: blue;
	}
	&.selectAll {
		display: inline;
		width: 23%;
		margin-left: 14rem;
		text-align: right;
		border: transparent;
		background-color: transparent;
		color: blue;
		font-size: 0.7rem;
	}
`;
const Input = styled.input`
	display: inline;
	position: absolute;
	right: 1.2rem;
	bottom: 1.2rem;
	transform: scale(2);
`;

const A = styled.a`
	text-decoration: none;
	color: blue;
`;

export default function Agree() {
	const navigate = useNavigate();
/* 	const addr = '/signUp/photo';
 */	const [selectAll, setSelectAll] = useState(false);
	const [checkboxes, setCheckboxes] = useState({
		checkbox1: false,
		checkbox2: false,
		checkbox3: false,
	});
	const handleClick = async () => {
		const {username, password, name, email, birthday} = useAuthContext();
		const {
			setAccessToken,
			setUserId,
			setUsername,
			setName,
			setBirthday,
			setIsMyAccountPrivate,
			setGender,
			setIsCustomGender,
			setProfileImageUrl,
			setBio,
			setUserLinks,
			setContacts,
			setPostNumber,
			setFollowingNumber,
			setFollowerNumber,
		} = useUserContext()
		const response = await trySignUp({username, password, name, email, birthday});
		if (response) {
			tryLogin({
				username, 
				password, 
				setAccessToken,
				setUserId,
				setUsername,
				setName,
				setBirthday,
				setIsMyAccountPrivate,
				setGender,
				setIsCustomGender,
				setProfileImageUrl,
				setBio,
				setUserLinks,
				setContacts,
				setPostNumber,
				setFollowingNumber,
				setFollowerNumber,
			})
		}
	};
	const setCheckbox = (num: number) => {
		const boxNumber = 'checkbox' + num;
		setCheckboxes((prevCheckboxes) => ({
			...prevCheckboxes,
			[boxNumber]: !prevCheckboxes[boxNumber as keyof typeof prevCheckboxes],
		}));
	};
	useEffect(() => {
		setCheckboxes({
			checkbox1: selectAll,
			checkbox2: selectAll,
			checkbox3: selectAll,
		});
	}, [selectAll]);
	return (
		<>
			<Link to="/signUp/certification">
				<Img
					src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQsl8RBI7W6MLf98a-xSu5HLLUasmcPAkIU1A&usqp=CAU"
					alt="뒤로가기"
				/>
			</Link>
			<H2>Instagram 약관 및 정책에 동의</H2>
			<Div className="text">계정을 만들려면 모든 약관에 동의해주세요.</Div>
			<br />
			<Div className="container">
				<H4>이용 약관</H4>
				<Button className="selectAll" onClick={() => setSelectAll(!selectAll)}>
					{selectAll ? '모두 선택 취소' : '모두 선택'}
				</Button>
			</Div>
			<BoxElement
				content="이용 약관(필수)"
				id="first"
				checkbox={checkboxes.checkbox1}
				setCheckbox={() => setCheckbox(1)}
			/>
			<Div className="line"></Div>
			<BoxElement
				content="개인정보처리방침(필수)"
				id="second"
				checkbox={checkboxes.checkbox2}
				setCheckbox={() => setCheckbox(2)}
			/>
			<Div className="line"></Div>
			<BoxElement
				content="위치 기반 기능(필수)"
				id="third"
				checkbox={checkboxes.checkbox3}
				setCheckbox={() => setCheckbox(3)}
			/>
			<Button className="next" onClick={handleClick}>
				동의
			</Button>
			<Button className="already" onClick={() => navigate('/')}>
				이미 계정이 있으신가요?
			</Button>
		</>
	);
}

function BoxElement(props: {
	content: string;
	id: string;
	checkbox: boolean;
	setCheckbox: () => void;
}) {
	const { content, id, checkbox, setCheckbox } = props;
	return (
		<Div className="box" id={id}>
			{content}
			<br />
			<A href="https://help.instagram.com/">더 알아보기</A>
			<Input type="checkbox" checked={checkbox} onClick={setCheckbox} />
		</Div>
	);
}
