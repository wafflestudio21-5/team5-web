import styled from 'styled-components';

import { useUserContext } from '../../contexts/UserContext.tsx';
import LinkItem from '../../pages/Profile/Edit/Link/LinkItem.tsx';
import Modal from '../../shared/Modal/Modal.tsx';

const LinkModalContainer = styled.div`
	height: fit-content;
	padding-bottom: 5rem;

	& h2 {
		font-size: 1.2rem;
		margin: 1rem 0;
	}
`;

type Props = {
	close: () => void;
	isClosing: boolean;
};

export default function LinkModal({ close, isClosing }: Props) {
	const { userLinks } = useUserContext();

	return (
		<Modal onBackgroundClick={close} isClosing={isClosing}>
			<LinkModalContainer>
				<h2>링크</h2>
				<hr />
				{userLinks.map((link, index) => (
					<LinkItem
						linkTitle={link.linkTitle}
						link={link.link}
						linkCount={index}
						isEdit={false}
					/>
				))}
			</LinkModalContainer>
		</Modal>
	);
}
