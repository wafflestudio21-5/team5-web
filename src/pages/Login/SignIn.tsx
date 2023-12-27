import { useState } from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'

const H3 = styled.h3`
	text-align: center;
	margin-top: 50px;
`
const StyledLink = styled(Link)`
	text-decoration: none;
	color: blue;
`
const Input = styled.input`
	display: block;
	margin: 0 auto 10px;
	width: 300px;
	height: 30px;
	font-size: 12px;
	padding-left: 7px;
	border-radius: 5px;
	border: 1px solid gainsboro;
	background-color: whitesmoke;
	&:focus {
		outline: none;
	}
`
const Div = styled.div`
	&.menu {
		display: grid;
		width: 300px;
		margin: 10px auto 30px auto;
		grid-template-columns: repeat(2, 1fr);
	}
	&.menuElement {
		padding-bottom: 10px;
		border-bottom: 1px solid black;
		text-align: center;
		display: grid;
	}
	&.notice {
		color: gainsboro;
		font-size: small;
		display: block;
		margin: 10px auto;
		width: 300px;
		text-align: center;
	}
	&.footer {
		position: fixed;
		border: 1px solid gainsboro;
		color: gainsboro;
		font-size: small;
		bottom: 0px;
		left: 0px;
		width: 100%;
		height: 30px;
		text-align: center;
		padding-top: 10px;
	}
`
const Button = styled.button`
	display: block;
	margin: 10px auto;
	width: 310px;
	height: 35px;
	border-radius: 5px;
	border: none;
	background-color: skyblue;
	color: white;
`
const Span = styled.span`
	background: #fff;
	padding: 0 10px;
	font-size: small;
	text-decoration: none;
`

export default function SignIn() {
	const [username, setUsername] = useState('')
	return (
		<div>
			<H3>전화번호 또는 이메일 주소 입력</H3>
			<Div className="menu">
				<Div className="menuElement">전화번호</Div>
				<Div className="menuElement">이메일</Div>
			</Div>
			<Input
				type="text"
				value={username}
				placeholder="전화번호"
				onChange={(e) => setUsername(e.target.value)}
			/>
			<Button>다음</Button>
			<Div className="notice">
				보안 및 로그인 목적으로 Instagram에서 보내는 SMS 알림을 수신할 수
				있습니다.
			</Div>
			<Div className="footer">
				이미 계정이 있으신가요?
				<StyledLink to="signIn">
					<Span>로그인</Span>
				</StyledLink>
			</Div>
		</div>
	)
}
