import styled from 'styled-components'

const Container = styled.div`
	display: flex;
	gap: 1rem;
`

const StyledLink = styled.a`
	text-decoration: none;
	color: black;
`

const ImageBox = styled.div`
	width: 2rem;
	height: 2rem;
	border-radius: 70%;
	overflow: hidden;
	display: inline;
`

const ProfileImage = styled.img`
	width: 100%;
	height: 100%;
	object-fit: cover;
`

const NameBox = styled.div`
	display: flex;
	align-items: center;
`

export default function UserInfo() {
	return (
		<StyledLink>
			<Container>
				<ImageBox>
					<ProfileImage
						src="https://wafflestudio.com/static/images/DefaultProfileImage.svg"
						alt="profile image"
					/>
				</ImageBox>
				<NameBox>
					<span>
						<b>sangchu</b>
					</span>
				</NameBox>
			</Container>
		</StyledLink>
	)
}
