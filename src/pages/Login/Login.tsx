import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import styled from 'styled-components';

import { resetAccessToken, tryLogin } from '../../apis/login';
import { getUserInformation } from '../../apis/user.ts';
import { baseURL } from '../../constants.ts';
import { useUserContext } from '../../contexts/UserContext';

const Img = styled.img`
	&.instagram {
		display: block;
		margin: 80px auto 20px;
		width: 60%;
	}
	&.facebook {
		float: left;
		width: 25px;
		margin-right: 10px;
	}
`;
const Input = styled.input`
	display: block;
	margin: 0 auto 10px;
	width: 90%;
	height: 2.5rem;
	font-size: 12px;
	padding-left: 7px;
	border-radius: 5px;
	border: 1px solid gainsboro;
	background-color: whitesmoke;
	&:focus {
		outline: none;
	}
`;
const Div = styled.div`
	&.passwordRecovery {
		display: block;
		width: 90%;
		margin: 15px auto;
		text-align: right;
		font-size: x-small;
		color: blue;
	}
	&.facebookBox {
		display: block;
		width: 190px;
		margin: 3rem auto 5rem;
	}
	&.line {
		width: 90%;
		text-align: center;
		border-bottom: 1px solid #aaa;
		line-height: 0.1em;
		margin: 40px auto 20px auto;
	}
	&.footer {
		position: fixed;
		border: 1px solid gainsboro;
		background-color: white;
		color: gainsboro;
		font-size: small;
		bottom: 0px;
		left: 0px;
		width: 100%;
		height: 30px;
		text-align: center;
		padding-top: 10px;
	}
`;
const BlueDiv = styled.div`
	color: blue;
`;
const Button = styled.button`
	display: block;
	margin: 10px auto;
	width: 90%;
	height: 2.5rem;
	border-radius: 1.2rem;
	border: none;
	background-color: blue;
	color: white;
`;
const Span = styled.span`
	background: #fff;
	padding: 0 10px;
	font-size: small;
	text-decoration: none;
`;
const StyledLink = styled(Link)`
	text-decoration: none;
	color: blue;
`;
const A = styled.a`
	text-decoration: none;
`;

export default function Login() {
	const [usernameInput, setUsernameInput] = useState('');
	const [passwordInput, setPasswordInput] = useState('');
	const [isActive, setIsActive] = useState(false);
	const { setIsLoggedIn, setAccessToken, setCurrentUser } = useUserContext();
	const location = useLocation();
	const [result, setResult] = useState<string | null>(null);
	const [queryParams, _] = useState(new URLSearchParams(location.search));

	useEffect(() => {
		if (usernameInput.length > 0 && passwordInput.length > 0) setIsActive(true);
		else setIsActive(false);
	}, [usernameInput, passwordInput]);

	useEffect(() => {
		console.log('in: ' + queryParams.get('result'));
		setResult(queryParams.get('result'));
		console.log(result);
		if (result === 'success') {
			autoLogin();
			setIsLoggedIn(true);
			console.log('in');
		} else if (result === 'fail') {
			alert('페이스북 로그인에 실패했습니다.');
		} else {
			if (
				localStorage.getItem('refreshToken') !== undefined &&
				localStorage.getItem('username')
			) {
				autoLogin();
			}
		}
	}, [, queryParams]);

	const autoLogin = async () => {
		const newAccessToken = await resetAccessToken();
		setAccessToken(newAccessToken);
		const username = localStorage.getItem('username');
		const currentUserInfo = await getUserInformation(
			username ? username : '',
			newAccessToken
		);
		setCurrentUser(currentUserInfo);
		setIsLoggedIn(true);
	};

	const handleClick = async () => {
		const accessToken = await tryLogin({
			username: usernameInput,
			password: passwordInput,
		});

		if (accessToken !== null) {
			setIsLoggedIn(true);
			setAccessToken(accessToken);

			const refreshToken = document.cookie.split('; ')[0].split('=')[1];
			localStorage.setItem('refreshToken', refreshToken);
			localStorage.setItem('username', usernameInput);

			const currentUserInfo = await getUserInformation(
				usernameInput,
				accessToken
			);
			setCurrentUser(currentUserInfo);
			setIsLoggedIn(true);
		}
	};

	return (
		<div>
			<Img
				className="instagram"
				src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/2a/Instagram_logo.svg/640px-Instagram_logo.svg.png"
				alt="인스타그램"
			/>
			<br />
			<Input
				type="text"
				name="username"
				value={usernameInput}
				placeholder="사용자 이름, 이메일 주소 또는 휴대폰 번호"
				autoComplete="off"
				onChange={(e) => setUsernameInput(e.target.value)}
			/>
			<Input
				type="password"
				name="password"
				value={passwordInput}
				placeholder="비밀번호"
				autoComplete="off"
				onChange={(e) => setPasswordInput(e.target.value)}
			/>
			<br />
			<Button disabled={!isActive} onClick={handleClick}>
				로그인
			</Button>
			<Div className="line">
				<Span> 또는 </Span>
			</Div>
			<A href={`${baseURL}/api/v1/auth/facebook_login`}>
				<Div className="facebookBox">
					{' '}
					<Img
						className="facebook"
						src="data:image/png;base64,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"
						alt="페이스북"
					/>
					<BlueDiv>Facebook으로 로그인</BlueDiv>
				</Div>
			</A>
			<Div className="footer">
				계정이 없으신가요?
				<StyledLink to="signUp/">
					<Span>가입하기</Span>
				</StyledLink>
			</Div>
		</div>
	);
}
