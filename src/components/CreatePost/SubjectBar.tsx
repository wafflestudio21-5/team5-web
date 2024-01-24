import { useState } from "react"
import styled from "styled-components"

type DivType = {
    isClicked: boolean,
    onClick: () => void
}

const Subject = styled.div<DivType>`
    display: inline-block;
    width: 4rem;
    height: 1.7rem;
    padding-top: 0.3rem;
    margin: 0 0.5rem;
    background-color: ${({ isClicked }) => (isClicked ? 'blue' : 'gainsboro')};
    border-radius: 1.2rem;
    text-align: center;
`
const ScrollContainer = styled.div`
    overflow-x: auto;
    height: 3rem;
    white-space: nowrap;
    &::-webkit-scrollbar {
        display: none;
    }
`
const SubjectBox = styled.div`
    width: 100%;
    border-bottom: 1px solid gainsboro;
    padding-top: 1rem;
    overflow-x: auto;
`

export default function Select() {
    const [clickNum, setClickNum] = useState(0)
    const subjects = [
        '일상',
        '유머',
        '음식',
        '여행',
        '게임',
        '스포츠',
        '동물',
        '패션',
        '예술',
        '뉴스'
    ]
    const handleClick = (num: number) => {
        if (clickNum === 0) setClickNum(num)
        else if (clickNum === num) setClickNum(0)
        else setClickNum(num)
    }
    return (
        <SubjectBox>
            <ScrollContainer>
                {subjects.map((item, index) => (
                    <Subject isClicked={clickNum === index+1} onClick={()=>handleClick(index+1)}>{item}</Subject>
                ))}
            </ScrollContainer>
        </SubjectBox>
    )
}
