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
	border-radius: 1rem;
    padding-left: 0.5rem;
    padding-right: 0.5rem;
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

export default function AskBirthday() {
    const [selectedDate, setSelectedDate] = useState(new Date())
    const navigate = useNavigate()
    return (
        <>
            <Link to='/signIn/askToSave'><Img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQsl8RBI7W6MLf98a-xSu5HLLUasmcPAkIU1A&usqp=CAU" alt="뒤로가기" /></Link>
			<H2>생년월일 입력</H2>
			<Div className="text">
                비즈니스, 반려동물 또는 기타 목적으로 이 계정을 만드는 경우에도 회원님의 실제 생년월일을 사용하세요. 이 생년월일 정보는 회원님이 공유하지 않는 한 다른 사람에게 공개되지 않습니다.
            </Div>
			<Input
				type="date"
				value={selectedDate.toISOString().split('T')[0]}
				placeholder="생년월일"
				onChange={(e) => setSelectedDate(new Date(e.target.value))}
			/>
			<Button className="next" onClick={()=>navigate('/signIn/askUsername')}>다음</Button>
            <Button className="already" onClick={()=>navigate('/')}>이미 계정이 있으신가요?</Button>
        </>
    )
}