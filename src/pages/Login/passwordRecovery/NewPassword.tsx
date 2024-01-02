import styled from "styled-components"
import { useState } from "react" 
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
const Input = styled.input`
	&.code {
        display: block;
        width: 90%;
        height: 3rem;
        margin: 1rem auto;
        padding-left: 0.5rem;
        border-radius: 1rem;
        border: 1px solid gainsboro;
        background-color: whitesmoke;
    }
    &.checkbox {
        display: inline;
        float: left;
    }
	&:focus {
		outline: none;
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

export default function NewPassword() {
	const [username, setUsername] = useState('')
	const navigate = useNavigate()
	return (
		<>
			<Link to='/passwordRecovery/certification'><Img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQsl8RBI7W6MLf98a-xSu5HLLUasmcPAkIU1A&usqp=CAU" alt="뒤로가기" /></Link>
			<H2>새 비밀번호 만들기</H2>
			<Div className="text">6자 이상의 문자와 숫자로 비밀번호를 만드세요. 계정에 로그인하려면 이 비밀번호가 필요합니다.</Div>
			<Input
				type="password"
                className="code"
				value={username}
				placeholder="새 비밀번호"
				onChange={(e) => setUsername(e.target.value)}
			/>
			<Button onClick={()=>navigate('certification/')}>계속</Button>
            <Div className="notice">
                <Input type="checkbox" className="checkbox" />
                <Div className="notice">다른 기기에서 로그아웃합니다. 다른 사람이 회원님의 계정을 사용한 경우 선택하세요.</Div>
            </Div>
		</>
	)
	
}
