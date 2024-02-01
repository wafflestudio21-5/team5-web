import { useEffect, useRef, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import styled from 'styled-components';

import {
	addLink,
	updateLink,
	fetchUserInformation,
	deleteLink,
} from '../../../../apis/account.ts';
import { useUserContext } from '../../../../contexts/UserContext.tsx';
import { getColor } from '../../../../styles/Theme.tsx';
import EditHeader from '../EditHeader.tsx';

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
	align-items: flex-start;

	& p {
		color: ${getColor('grey')};
		margin-bottom: 0.4rem;
		font-size: 0.9rem;
	}

	& input {
		font-size: 1.2rem;
		width: 100%;
		margin-bottom: 1rem;
		padding: 0.5rem 0;

		border: none;
		border-bottom: 1px solid ${getColor('lightGrey')};

		&:focus {
			outline: none;
		}
	}
`;

const DeleteButton = styled.button`
	background: none;
	border: none;

	font-size: 1rem;
	font-weight: 700;
	color: ${getColor('red')};

	&:hover {
		cursor: pointer;
	}

	&.hidden {
		display: none;
	}
`;

export default function LinkDetail() {
	const { accessToken, currentUser, setCurrentUser, userLinks } =
		useUserContext();
	const { linkParam } = useParams();
	const navigate = useNavigate();

	// 입력창 자동 focus
	const inputRef = useRef<HTMLInputElement>(null);
	useEffect(() => {
		if (inputRef.current) {
			inputRef.current.focus();
		}
	}, []);

	const isAdd = linkParam === 'add';

	const linkNumber = parseInt(linkParam!);
	if (
		!isAdd &&
		(Number.isNaN(linkNumber) ||
			linkNumber < 0 ||
			linkNumber >= userLinks.length)
	) {
		navigate('/account/edit/link');
	}

	const [editedLink, setEditedLink] = useState(
		isAdd ? '' : userLinks[linkNumber].link
	);
	const [editedLinkTitle, setEditedLinkTitle] = useState(
		isAdd ? '' : userLinks[linkNumber].linkTitle
	);

	const onSubmit = async () => {
		isAdd
			? await addLink(accessToken, editedLinkTitle, editedLink)
			: await updateLink(
					accessToken,
					userLinks[linkNumber].linkId,
					editedLinkTitle.trim(),
					editedLink.trim()
				);
		await fetchUserInformation(accessToken, currentUser, setCurrentUser);
		navigate('/account/edit/link');
	};

	const onDelete = async () => {
		await deleteLink(accessToken, userLinks[linkNumber].linkId);
		await fetchUserInformation(accessToken, currentUser, setCurrentUser);
		navigate('/account/edit/link');
	};

	return (
		<EditLayout>
			<EditHeader
				title={isAdd ? '외부 링크 추가' : '외부 링크 수정'}
				onClickSave={onSubmit}
			/>
			<EditContainer>
				<p>URL</p>
				<input
					type="text"
					value={editedLink}
					ref={inputRef}
					onChange={(e) => setEditedLink(e.target.value)}
				/>
				<p>제목</p>
				<input
					type="text"
					value={editedLinkTitle}
					onChange={(e) => setEditedLinkTitle(e.target.value)}
				/>
			</EditContainer>
			<DeleteButton className={isAdd ? 'hidden' : ''} onClick={onDelete}>
				링크 삭제
			</DeleteButton>
		</EditLayout>
	);
}
