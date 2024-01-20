import styled from 'styled-components'
import { Link, useNavigate } from 'react-router-dom'
import { useUserContext } from '../../contexts/UserContext'
import { useEffect, useState } from 'react'
import axios from 'axios'

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
        width: 84%;
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
`
const Img = styled.img`
    width: 3%;
    margin-top: 0.3rem;
    float: left;
`
const Input = styled.input`
    position: relative;
    margin: 0 auto;
`


export default function AddPhoto() {
    const navigate = useNavigate()
	return (
		<>
            <Div className='header'>
                <Img src="https://cdn-icons-png.flaticon.com/256/75/75519.png" alt="취소" />
                <Div className='title'>새 게시물</Div>
                <Button className='next' onClick={()=>navigate('/addText')}>다음</Button> 
            </Div>
			<Input type="file" accept='image/*' />
            <Div>

            </Div>
		</>
	)
}
