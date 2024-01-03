import styled from 'styled-components'
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

const Img = styled.img`
	width: 2rem;
	margin-left: 1rem;
`
const H2 = styled.h2`
	display: block;
	width: 90%;
	margin-left: 1.5rem;
`
const Div = styled.div`
	&.text {
		width: 90%;
		margin: 0 1.5rem;
		font-size: 0.9rem;
	}
	&#link {
		text-align: center;
	}
`
const Input = styled.input`
	display: block;
	width: 90%;
	height: 3rem;
	margin: 1rem auto;
	padding-left: 0.5rem;
	border-radius: 1rem;
	border: 1px solid gainsboro;
	background-color: whitesmoke;
	&:focus {
		outline: none;
	}
`
const Button = styled.button`
	display: block;
	margin: 1rem auto;
	width: 90%;
	height: 2.5rem;
	border-radius: 1.2rem;
	border: none;
	background-color: blue;
	color: white;
`

export default function Login() {
	const [username, setUsername] = useState('')
	const navigate = useNavigate()
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
				type="number"
				value={username}
				placeholder="코드 입력"
				onChange={(e) => setUsername(e.target.value)}
			/>
			<Button onClick={() => navigate('/passwordRecovery/newPassword')}>
				계속
			</Button>
			<Div className="text" id="link">
				코드 다시 받기
			</Div>
		</>
	)
}
