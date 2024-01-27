import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

import editCancel from '../../../assets/Images/Profile/EditProfile/edit-cancel.png';
import editSave from '../../../assets/Images/Profile/EditProfile/edit-save.png';
import Icon from '../../../shared/Icon.tsx';

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

export default function EditHeader({
	title,
	onClickSave,
}: {
	title: string;
	onClickSave: () => void;
}) {
	const navigate = useNavigate();

	return (
		<EditHeaderContainer>
			<Icon
				src={editCancel}
				alt="취소"
				onClick={() => navigate('/account/edit')}
			/>
			<h2>{title}</h2>
			<Icon src={editSave} alt="저장" onClick={onClickSave} />
		</EditHeaderContainer>
	);
}
