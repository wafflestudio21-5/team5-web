import styled from 'styled-components'
import UserInfo from './UserInfo'

const Wrapper = styled.div`
	display: flex;
	width: 100%;
	flex-direction: row;
	justify-content: space-between;
	padding-bottom: 0.75rem;
	padding-left: 0.25rem;
	box-sizing: border-box;
`

const ExtraButton = styled.button`
	background-color: transparent;
	border: none;
	box-sizing: border-box;
	padding: 0;
	display: flex;
	align-items: center;
	& img {
		width: 2em;
		height: 1.5em;
	}
`

export default function PostHeader() {
	return (
		<Wrapper>
			<UserInfo />
			<ExtraButton>
				<img src="/ellipsis.svg" alt="ellipsis" />
			</ExtraButton>
		</Wrapper>
	)
}
