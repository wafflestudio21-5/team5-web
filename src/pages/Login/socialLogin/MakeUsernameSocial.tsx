import { convert } from 'hangul-romanization';
import { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import styled from 'styled-components';

import { useAuthContext } from '../../../contexts/AuthContext';
import { tryFacebookSignup } from '../../../apis/login';
import { useUserContext } from '../../../contexts/UserContext';
import { getUserInformation } from '../../../apis/user';

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
	border: 1px solid ${({ $isvalid }) => ($isvalid ? 'gainsboro' : 'red')};
	background-color: whitesmoke;
	&:focus {
		outline: none;
	}
`;
const Div = styled.div`
	&.notice {
		color: red;
		font-size: 0.7rem;
		margin-left: 1.5rem;
		margin-top: -0.5rem;
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
`;

export default function MakeUsernameSocial() {
	const { name, username, setUsername } = useAuthContext();
	const { setAccessToken, accessToken, setCurrentUser } = useUserContext();
	const navigate = useNavigate();
	const [isValid, setIsValid] = useState(false);
	const usernameRegex = /^[a-zA-Z0-9_.]{1,30}$/i;
	const location = useLocation();
	const birthday = location.state['birthday'];

	const handleChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
		setUsername(e.target.value);
	};

	useEffect(() => {
		if (username === '')
			setUsername(convert(name) + Math.floor(Math.random() * 1000 + 1));
	}, []);

	useEffect(() => {
		setIsValid(usernameRegex.test(username));
	}, [username]);

	useEffect(() => {
		if (accessToken) {
			console.log(accessToken);
			temp();
		}
	}, [accessToken]);

	const getUser = async () => {
		const currentUserInfo = await getUserInformation(username, accessToken);
		await setCurrentUser(currentUserInfo);
		navigate('/signUp/photo');
	};

	const handleClick = async () => {
		if (usernameRegex.test(username)) {
			setIsValid(true);
			const newAccessToken = await tryFacebookSignup({ username, birthday });
			setAccessToken(newAccessToken);
			const newRefreshToken = document.cookie.split('; ')[0].split('=')[1];
			localStorage.setItem('refreshToken', newRefreshToken);
			localStorage.setItem('username', username);
		} else {
			setIsValid(false);
		}
	};
	return (
		<>
			<Link to="/signUp/birthdayS">
				<Img
					src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQsl8RBI7W6MLf98a-xSu5HLLUasmcPAkIU1A&usqp=CAU"
					alt="뒤로가기"
				/>
			</Link>
			<H2>사용자 이름 만들기</H2>
			<Div className="text">
				사용자 이름을 추가하거나 추천 이름을 사용하세요. 언제든지 변경할 수
				있습니다.
			</Div>
			<Input
				$isvalid={isValid}
				type="text"
				value={username}
				placeholder="사용자 이름"
				onChange={handleChange}
			/>
			{!isValid && (
				<Div className="notice">
					1~30자 사이의 알파벳, 온점, 언더바로 작성해주세요.
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
