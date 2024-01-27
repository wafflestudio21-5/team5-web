import styled from 'styled-components';

import { useUserContext } from '../../../../contexts/UserContext.tsx';
import BackHeader from '../../../../shared/BackHeader.tsx';

import LinkItem from './LinkItem.tsx';

const EditLayout = styled.div`
	width: 100%;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
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

	return (
		<EditLayout>
			<BackHeader title="링크" backURL="/account/edit" />
			<EditContainer>
				<AddLinkContainer>
					<p>아이콘</p>
					<p>외부 링크 추가</p>
				</AddLinkContainer>
				{userLinks.map((link) => (
					<LinkItem linkTitle={link.linkTitle} link={link.link} />
				))}
			</EditContainer>
		</EditLayout>
	);
}
