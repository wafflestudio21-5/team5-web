import styled from 'styled-components';
import { Link } from 'react-router-dom';

const HeaderBox = styled.div`
	position: fixed;
	width: 430px;
	height: 1.5rem;
	background-color: white;
	border-bottom: 1px solid gainsboro;
	padding-bottom: 0.5rem;
`;
const Title = styled.div`
	display: inline-block;
	text-align: center;
	width: 81%;
	font-weight: 600;
`;
const Prev = styled.img`
	width: 3%;
	margin-top: 0.3rem;
	float: left;
`;
export default function Header() {
	<HeaderBox>
		<Link to="/addPost">
			<Prev
				src="https://cdn-icons-png.flaticon.com/512/271/271220.png"
				alt="취소"
			/>
		</Link>
		<Title>새 게시물</Title>
	</HeaderBox>;
}
