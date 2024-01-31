import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

import tempImg from '../../../../assets/Images/search.png';
import { getColor } from '../../../../styles/Theme.tsx';

const LinkItemLayout = styled.div`
	width: 100%;
	height: 4.5rem;
	display: flex;
	flex-direction: row;
	justify-content: space-between;
	align-items: center;

	& img {
		width: 3rem;
		height: 3rem;
		border: 1px solid ${getColor('lightGrey')};
		border-radius: 50%;
		margin-right: 1rem;
	}
`;

const LinkItemContainer = styled.div`
	width: 100%;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: flex-start;

	& p.title {
		color: ${getColor('black')};
		font-size: 1.2rem;
		font-weight: 700;
		margin: 0;
	}

	& p.link {
		font-size: 1.2rem;
		font-weight: 400;
		color: ${getColor('grey')};
		margin: 0;
	}

	&:hover {
		cursor: pointer;
	}
`;

export default function LinkItem({
	linkTitle,
	link,
	linkCount,
	isEdit,
}: {
	linkTitle: string;
	link: string;
	linkCount: number;
	isEdit: boolean;
}) {
	const navigate = useNavigate();

	const onClickNavigate = () => {
		if (isEdit) {
			navigate(`/account/edit/link/${linkCount}`);
		} else {
			window.open(link, '_blank', 'noopener,noreferrer');
		}
	};

	return (
		<LinkItemLayout onClick={onClickNavigate}>
			<img src={tempImg} alt="link icon" />
			<LinkItemContainer>
				<p className="title">{linkTitle}</p>
				<p className="link">{link}</p>
			</LinkItemContainer>
			{/*<p>화살표</p>*/}
		</LinkItemLayout>
	);
}
