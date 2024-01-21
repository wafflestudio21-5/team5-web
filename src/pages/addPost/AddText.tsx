import styled from 'styled-components'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'


const Div = styled.div`
    &.header {
        position: fixed;
        width: 430px;
        height: 1.5rem;
        background-color: white;
        border-bottom: 1px solid gainsboro;
        padding-bottom: 0.5rem;
    }
    &.title {
        display: inline-block;
        text-align: center;
        width: 81%;
        font-weight: 600;
    }
    &.background {
        background-color: white;
        position: fixed;
        width: 430px;
        height: 100%;
        overflow-y: auto;
        z-index: 100;
    }
    background::-webkit-scrollbar {
        display: none;
    }
    &.text {
        display: inline-block;
        margin-left: 0.5rem;
    }
    &.container {
        width: 100%;
        border-bottom: 1px solid gainsboro;
        padding-bottom: 1rem;
        padding-top: 1rem;
        overflow-x: auto;
    }
    &.scroll-content {
        display: inline-flex;
    }
    &.subject {
        display: inline-block;
        width: 4rem;
        height: 1.7rem;
        padding-top: 0.3rem;
        margin: 0 0.5rem;
        background-color: gainsboro;
        border-radius: 1.2rem;
        text-align: center;
    }
    &.buttonBackground {
        position: fixed;
        bottom: 0;
        border-top: 1px solid gainsboro;
        width: 430px;
        background-color: white;
        height: 5rem;
    }
`
const Button = styled.button`
    &.share {
        position: fixed;
        bottom: 1rem;
        background-color: blue;
        width: 400px;
        height: 3rem;
        margin-left: 15px;
        border-radius: 0.5rem;
        border: none;
        color: white;
        font-weight: 600;
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
        width: 120%;
        float: left;
    }
    &.photo {
        display: block;
        width: 60%;
        margin: 0 auto;
    }
    &.rightArrow {
        width: 1rem;
        float: right;
        padding-top: 0.2rem;
        margin-right: 0.7rem;
    }
    &.icon {
        width: 1.5rem;
        float: left;
    }
`
const Textarea = styled.textarea`
    width: 100%;
    height: 4rem;
    border: none;
    margin-top: 1rem;
    margin-bottom: none;
    border-bottom: 1px solid gainsboro;
    resize: none;
    outline: none;
    font-family: 'Noto Sans KR', sans-serif;
`

export default function AddText() {
    const navigate = useNavigate()
    const handleClick = async () => {
        try {
			const response = await axios.post(
				'/api/v1/posts',
			)
			console.log(response)
		} catch (error) {
			alert('포스트 생성 실패')
		}
    }
    return (
        <Div className='background'>
            <Div className='header'>
                <Button className='prev' onClick={()=>navigate('/addPost')}>
                    <Img className='prev' src="https://cdn-icons-png.flaticon.com/512/271/271220.png" alt="취소" />
                </Button>
                <Div className='title'>새 게시물</Div>
            </Div>
            <Img className='photo' src="https://i.pinimg.com/originals/29/bf/fc/29bffc789ddb03ec827d5008e5e73395.jpg" alt="dummy" />
            <Textarea placeholder='문구를 작성하거나 설문을 추가하세요...'  />
            <Select />
            <Block title="사람 태그" />
            <Block title="음악 추가" />
            <Block title="알림 추가" />
            <Block title="공개 대상" />
            <Block title="위치 추가" />
            <Block title="고급 설정" />
            <br /><br /><br /><br /><br /><br />
            <Div className='buttonBackground'>
                <Button className='share' onClick={handleClick}>공유</Button>
            </Div>
		</Div>
    )
}

function Block(props: {title: string}) {
    const {title} = props;
    return (
        <Div className='container'>
            <Img className='icon' src="https://mblogthumb-phinf.pstatic.net/MjAxOTAzMTlfMzkg/MDAxNTUzMDAxODEwMzk5.8pXP3XjvzjUzNV86zV796kuswjQOSkKw9L1jLCb9a7og.2HnP8pqAH9bkFMFsWTUV_B69LEoey1624U2_1BGynaYg.PNG.urbanstars/glyph-logo_May2016.png?type=w800" alt="icon" />
            <Div className='text'>{title}</Div>
            <Img className='rightArrow' src="https://cdn-icons-png.flaticon.com/512/271/271228.png" alt="select" />
        </Div>
    )
}

function Select() {
    return (
        <Div className='container'>
            <Div className='scroll-content'>
                <Div className='subject'>일상</Div>
                <Div className='subject'>유머</Div>
                <Div className='subject'>음식</Div>
                <Div className='subject'>여행</Div>
                <Div className='subject'>게임</Div>
                <Div className='subject'>스포츠</Div>
                <Div className='subject'>동물</Div>
                <Div className='subject'>패션</Div>
                <Div className='subject'>예술</Div>
                <Div className='subject'>뉴스</Div>
            </Div>
        </Div>
    )
}
