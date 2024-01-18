import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import styled from 'styled-components'
import { useUserContext } from '../../../contexts/UserContext'

interface InputProps {
	isvalid: boolean
	type: string
	value: string
	placeholder: string
	onChange: React.ChangeEventHandler<HTMLInputElement>
}

const Img = styled.img`
	width: 2rem;
	margin-left: 1rem;
`
const H2 = styled.h2`
	display: block;
	width: 90%;
	margin-left: 1.5rem;
`
const Input = styled.input<InputProps>`
	display: block;
	width: 90%;
	height: 3rem;
	margin: 1rem auto;
	padding-left: 1rem;
	border-radius: 1rem;
	border: 1px solid ${({ isvalid }) => (isvalid ? 'gainsboro' : 'red')};
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
	&.notice {
		width: 90%;
		margin: -0.5rem 0 0 1.5rem;
		color: red;
		font-size: 0.7rem;
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
		color: blue;
	}
`

export default function CertificationSignUp() {
	const navigate = useNavigate()
	const { email } = useUserContext()
	const [code, setCode] = useState('')
	const [isValid, setIsValid] = useState(true)
	const [isModalOpen, setIsModalOpen] = useState(false)
	const handleClick = () => {
		if(isModalOpen) setIsModalOpen(isModalOpen)
		if (code.length === 6) {
			setIsValid(true)
			navigate('/signUp/agreeToTerm')
			setIsValid(false)
		} else setIsValid(false)
	}
	return (
		<>
			<Link to="/signUp/email">
				<Img
					src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQsl8RBI7W6MLf98a-xSu5HLLUasmcPAkIU1A&usqp=CAU"
					alt="뒤로가기"
				/>
			</Link>
			<H2>인증 코드 입력</H2>
			<Div className="text">
				계정을 확인하려면 {email} 주소로 전송된 6자리 코드를 입력하세요.
			</Div>
			<Input
				isvalid={isValid}
				type="number"
				value={code}
				placeholder="인증 코드"
				onChange={(e) => setCode(e.target.value)}
			/>
			{!isValid && (
				<Div className="notice">
					정확한 코드를 입력했는지 확인하고 다시 시도하세요.
				</Div>
			)}
			<Button className="next" onClick={handleClick}>
				다음
			</Button>
			<Button className="option" onClick={() => setIsModalOpen(true)}>
				코드를 받지 못했습니다.
			</Button>
			<Button className="already" onClick={() => navigate('/')}>
				이미 계정이 있으신가요?
			</Button>
		</>
	)
}
