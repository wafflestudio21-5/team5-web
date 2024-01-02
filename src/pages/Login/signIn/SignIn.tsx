import { useState } from 'react'
import styled from 'styled-components'
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
`
const Button = styled.button`
	display: block;
	margin: 1rem auto;
	width: 93%;
	height: 2.5rem;
	border-radius: 1.2rem;
	border: none;
	background-color: blue;
	color: white;
`

export default function SignIn() {
	const [username, setUsername] = useState('')
	const navigate = useNavigate();
	return (
		<>
			<Link to='/'><Img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQsl8RBI7W6MLf98a-xSu5HLLUasmcPAkIU1A&usqp=CAU" alt="뒤로가기" /></Link>
			<H2>이름 입력</H2>
			<Div className="text">친구들이 회원님을 찾을 수 있도록 이름을 추가하세요.</Div>
			<Input
				type="text"
                className="code"
				value={username}
				placeholder="성명"
				onChange={(e) => setUsername(e.target.value)}
			/>
			<Button onClick={()=>navigate('password/')}>다음</Button>
		</>
	)
}
