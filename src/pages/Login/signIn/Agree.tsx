import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
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

export default function Agree() {
    const [username, setUsername] = useState('')
    const navigate = useNavigate()
    return (
        <>
            <Link to='/signIn/askBirthday'><Img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQsl8RBI7W6MLf98a-xSu5HLLUasmcPAkIU1A&usqp=CAU" alt="뒤로가기" /></Link>
			<H2>Instagram 약관 및 정책에 동의</H2>
			<Div className="text">계정을 만들려면 모든 약관에 동의해주세요.</Div>
			<Input
				type="text"
				value={username}
				placeholder="사용자 이름"
				onChange={(e) => setUsername(e.target.value)}
			/>
			<Button className="next" onClick={()=>navigate('/signIn/askEmail')}>다음</Button>
            <Button className="already" onClick={()=>navigate('/')}>이미 계정이 있으신가요?</Button>
        </>
    )
}