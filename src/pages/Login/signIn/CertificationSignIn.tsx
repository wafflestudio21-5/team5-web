import { useState } from "react"
import { useNavigate, Link } from "react-router-dom"
import styled from "styled-components"

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
	padding-left: 1rem;
	border-radius: 1rem;
	border: 1px solid gainsboro;
	background-color: whitesmoke;
	&:focus {
		outline: none;
	}
`
const Div = styled.div`
	&.text {
		width: 90%;
		margin: 0 1.5rem;
		font-size: 0.9rem;
	}
`
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
        display: block;
        width: 90%;
        position: fixed;
        left: 5%;
        bottom: 1rem;
        border: none;
        background-color: white;
    }
`

export default function CertificationSignIn() {
    const navigate = useNavigate()
    const [email, setEmail] = useState("")
    return (
        <>
            <Link to='/signIn/askBirthday'><Img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQsl8RBI7W6MLf98a-xSu5HLLUasmcPAkIU1A&usqp=CAU" alt="뒤로가기" /></Link>
			<H2>인증 코드 입력</H2>
			<Div className="text">계정을 확인하려면 {email} 주소로 전송된 6자리 코드를 입력하세요.</Div>
			<Input
				type="text"
				value={email}
				placeholder="인증 코드"
				onChange={(e) => setEmail(e.target.value)}
			/>
			<Button className="next" onClick={()=>navigate('/signIn/agreeToTerm')}>다음</Button>
            <Button className="option" onClick={()=>navigate('/signIn/agreeToTerm')}>코드를 받지 못했습니다.</Button>
            <Button className="already" onClick={()=>navigate('/')}>이미 계정이 있으신가요?</Button>
        </>
    )
}