import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

import { useUserContext } from '../../../../contexts/UserContext.tsx';
import BackHeader from '../../../../shared/BackHeader.tsx';
import { getColor } from '../../../../styles/Theme.tsx';

import LinkItem from './LinkItem.tsx';

const EditLayout = styled.div`
	width: 100%;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	border-bottom: 1px solid ${getColor('lightGrey')};
`;

const EditContainer = styled.div`
	width: 90%;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
`;

const AddLinkContainer = styled.div`
	width: 100%;
	display: flex;
	flex-direction: row;
	justify-content: center;
	align-items: flex-start;
`;

export default function Link() {
	const { userLinks } = useUserContext();

	const navigate = useNavigate();

	return (
		<EditLayout>
			<BackHeader title="링크" backURL="/account/edit" />
			<EditContainer>
				<AddLinkContainer onClick={() => navigate('/account/edit/link/add')}>
					<p>아이콘</p>
					<p>외부 링크 추가</p>
				</AddLinkContainer>
				{userLinks.map((link, index) => (
					<LinkItem
						linkTitle={link.linkTitle}
						link={link.link}
						linkCount={index}
						isEdit={true}
					/>
				))}
			</EditContainer>
		</EditLayout>
	);
}
