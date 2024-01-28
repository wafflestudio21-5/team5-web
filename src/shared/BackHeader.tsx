import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

import back from '../assets/Images//Profile/back.png';

import Icon from './Icon.tsx';

const BackHeaderContainer = styled.div`
	width: 90%;
	display: flex;
	flex-direction: row;
	justify-content: space-between;
	align-items: center;
	margin-bottom: 2.5rem;

	& h2 {
		margin: 0 auto 0 2rem;
	}
`;

export default function BackHeader({
	title,
	backURL,
}: {
	title: string;
	backURL: string;
}) {
	const navigate = useNavigate();

	return (
		<BackHeaderContainer>
			<Icon src={back} alt="취소" onClick={() => navigate(`${backURL}`)} />
			<h2>{title}</h2>
		</BackHeaderContainer>
	);
}
