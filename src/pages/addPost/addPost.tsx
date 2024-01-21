import styled from 'styled-components'
import { useNavigate } from 'react-router-dom'

const Div = styled.div`
    &.header {
        width: 100%;
        height: 1.5rem;
        border-bottom: 1px solid gainsboro;
        padding-bottom: 0.5rem;
    }
    &.title {
        display: inline-block;
        text-align: center;
        width: 81%;
        font-weight: 600;

    }
    
`
const Button = styled.button`
    &.next {
        display: inline-block;
        right: 1rem;
        width: 10%;
        text-align: right;
        color: blue;
        border: none;
        background-color: transparent;
    }
    &.prev {
        width: 1.5rem;
        height: 1.5rem;
        border: none;
        background-color: transparent;
        overflow: hidden;
    }
`
const Img = styled.img`
    &.prev {
        width: 150%;
        float: left;
    }
    &.photo {
        display: block;
        width: 60%;
        margin: 0 auto;
    }
`
const Textarea = styled.textarea`
    width: 100%;
    height: 4rem;
    border: none;
    margin-top: 1rem;
    border-bottom: 1px solid gainsboro;
    resize: none;
    outline: none;
`

export default function AddText() {
    const navigate = useNavigate()
    return (
        <>
            <Div className='header'>
                <Button className='prev' onClick={()=>navigate('/addPost')}>
                    <Img className='prev' src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQsl8RBI7W6MLf98a-xSu5HLLUasmcPAkIU1A&usqp=CAU" alt="취소" />
                </Button>
                <Div className='title'>새 게시물</Div>
            </Div>
            <Img className='photo' src="https://i.pinimg.com/originals/29/bf/fc/29bffc789ddb03ec827d5008e5e73395.jpg" alt="dummy" />
            <Textarea placeholder='문구를 작성하거나 설문을 추가하세요...'  />
		</>
    )
}
/* 
function Block() {
    return (
        <Div>
            <Img />
            <Div></Div>
        </Div>
    )
} */