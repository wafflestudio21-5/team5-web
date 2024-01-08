import styled from 'styled-components'
import Icon from '../../shared/Icon.tsx'

const NavBarLayout = styled.nav`
	width: 430px;
	display: flex;
	flex-direction: row;
	justify-content: space-evenly;
	align-items: center;
	border-top: 1px solid #dbdbdb;
	position: fixed;
	left: 50%;
	transform: translateX(-50%);
	bottom: 0;
	z-index: 99;
`

export default function NavBar() {
	return (
		<NavBarLayout>
			<Icon src={} alt="Home"></Icon>
		</NavBarLayout>
	)
}
