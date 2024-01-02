import { useState } from "react"
import styled from "styled-components"
import { Link, useNavigate } from "react-router-dom"
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

export default function MakePassword() {
    const [password, setPassword] = useState('')
    const navigate = useNavigate()
    return (
        <>
            <Link to='/signIn'><Img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQsl8RBI7W6MLf98a-xSu5HLLUasmcPAkIU1A&usqp=CAU" alt="뒤로가기" /></Link>
			<H2>비밀번호 만들기</H2>
			<Div className="text">다른 사람이 추측할 수 없는 6자 이상의 문자 또는 숫자로 비밀번호를 만드세요.</Div>
			<Input
				type="password"
                className="code"
				value={password}
				placeholder="비밀번호"
				onChange={(e) => setPassword(e.target.value)}
			/>
			<Button onClick={()=>navigate('/signIn/askToSave')}>다음</Button>
        </>
    )
}