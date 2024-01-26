import styled from 'styled-components';

const Container = styled.div`
	display: flex;
	flex-direction: column;
	width: fit-content;
	height: fit-content;
	padding: 0.5rem;
	& p {
		text-align: center;
		font-size: 0.75rem;
		margin-top: 0.25rem;
		margin-bottom: 0;
	}
`;

const ProfileImage = styled.div`
	width: 3rem;
	height: 3rem;
	border: 2px solid gray;
	border-radius: 50%;
	overflow: hidden;
	& img {
		width: 100%;
		height: 100%;
	}
`;

export default function StoryProfile() {
	return (
		<Container>
			<ProfileImage>
				<img src="https://mblogthumb-phinf.pstatic.net/MjAyMDExMDFfMTgy/MDAxNjA0MjI4ODc1NDMw.Ex906Mv9nnPEZGCh4SREknadZvzMO8LyDzGOHMKPdwAg.ZAmE6pU5lhEdeOUsPdxg8-gOuZrq_ipJ5VhqaViubI4g.JPEG.gambasg/유튜브_기본프로필_하늘색.jpg?type=w800" />
			</ProfileImage>
			<p>SangChu</p>
		</Container>
	);
}
