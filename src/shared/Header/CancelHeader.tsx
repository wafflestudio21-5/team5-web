import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

import editCancel from '../../assets/Images/Profile/Edit/edit-cancel.png';
import editSave from '../../assets/Images/Profile/Edit/edit-save.png';
import Icon from '../Icon.tsx';

const EditHeaderContainer = styled.div`
	width: 90%;
	height: fit-content;
	display: flex;
	flex-direction: row;
	justify-content: space-between;
	align-items: center;
	margin-bottom: 1.5rem;

	& h2 {
		margin: 0 auto 0 2rem;
	}
`;

export default function CancelHeader({
	title,
	customURL,
}: {
	title: string;
	onClickSave: () => void;
	customURL?: string;
}) {
	const navigate = useNavigate();

	const handleCancel = () => {
		if (customURL) {
			navigate(customURL);
		} else {
			navigate(-1);
		}
	};

	return (
		<EditHeaderContainer>
			<Icon src={editCancel} alt="취소" onClick={handleCancel} />
			<h2>{title}</h2>
			<Icon src={editSave} alt="저장" />
		</EditHeaderContainer>
	);
}
