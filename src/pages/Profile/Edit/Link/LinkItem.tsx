import styled from 'styled-components';

import { getColor } from '../../../../styles/Theme.tsx';

const LinkItemLayout = styled.div`
	width: 100%;
	display: flex;
	flex-direction: row;
	justify-content: space-between;
	align-items: center;
`;

const LinkItemContainer = styled.div`
	width: 100%;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: flex-start;

	& p {
		color: ${getColor('black')};
		font-size: 1.2rem;
	}

	& p.link {
		color: ${getColor('grey')};
	}
`;

export default function LinkItem({
	linkTitle,
	link,
}: {
	linkTitle: string;
	link: string;
}) {
	return (
		<LinkItemLayout>
			<p>아이콘</p>
			<LinkItemContainer>
				<p>{linkTitle}</p>
				<p className="link">{link}</p>
			</LinkItemContainer>
			<p>화살표</p>
		</LinkItemLayout>
	);
}
