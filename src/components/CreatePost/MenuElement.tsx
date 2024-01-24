import styled from "styled-components"


type Props = {
    title: string,
    icon: string,
}

const Icon = styled.img`
    width: 1.5rem;
    float: left;
`
const ElementBox = styled.div`
    width: 100%;
    border-bottom: 1px solid gainsboro;
    padding-bottom: 1rem;
    padding-top: 1rem;
    overflow-x: auto;
`
const RightArrow = styled.img`
    width: 1rem;
    float: right;
    margin-right: 0.7rem;
    padding-top: 0.2rem;
`
const Text = styled.div`
    display: inline-block;
    margin-left: 0.5rem;
`

export default function MenuElement({title, icon}: Props) {
    return (
        <ElementBox>
            <Icon className='icon' src={icon} alt="icon" />
            <Text>{title}</Text>
            <RightArrow src="https://cdn-icons-png.flaticon.com/512/271/271228.png" alt="select" />
        </ElementBox>
    )
}