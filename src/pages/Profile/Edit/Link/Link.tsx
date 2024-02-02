import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

import AddLinkIcon from '../../../../assets/Images/Profile/Edit/AddLink.png';
import { useUserContext } from '../../../../contexts/UserContext.tsx';
import BackHeader from '../../../../shared/Header/BackHeader.tsx';
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
	height: 4.5rem;
	display: flex;
	flex-direction: row;
	justify-content: flex-start;
	align-items: center;

	& div {
		display: flex;
		justify-content: center;
		align-items: center;

		width: 3rem;
		height: 3rem;
		border: 1px solid ${getColor('lightGrey')};
		border-radius: 50%;
		margin-right: 1rem;

		& img {
			width: 1.7rem;
			height: 1.7rem;
		}
	}

	& p {
		color: ${getColor('black')};
		font-size: 1.2rem;
		font-weight: 700;
		margin: 0;
	}
`;

export default function Link() {
	const { userLinks } = useUserContext();

	const navigate = useNavigate();

	return (
		<EditLayout>
			<BackHeader title="링크" backURL="/account/edit" />
			<EditContainer>
				<AddLinkContainer onClick={() => navigate('/account/edit/link/add')}>
					<div>
						<img src={AddLinkIcon} alt="외부 링크 추가" />
					</div>
					<p>외부 링크 추가</p>
				</AddLinkContainer>
				{userLinks.map((link, index) => (
					<LinkItem
						key={link.linkId}
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
