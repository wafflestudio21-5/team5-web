import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

import { editBio, fetchUserInformation } from '../../../apis/account.ts';
import { useUserContext } from '../../../contexts/UserContext.tsx';
import { getColor } from '../../../styles/Theme.tsx';

import EditHeader from './EditHeader.tsx';

const EditLayout = styled.div`
	width: 100%;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
`;

const EditContainer = styled.div`
	width: 100%;
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
		margin-bottom: 0.5rem;
		padding: 0.5rem 1rem;

		border: none;
		border-bottom: 1px solid ${getColor('blue')};

		&:focus {
			outline: none;
		}
	}
`;

export default function Bio() {
	const { accessToken, currentUser, setCurrentUser, bio } = useUserContext();
	const [editedBio, setEditedBio] = useState(bio);

	const navigate = useNavigate();

	// 입력창 자동 focus
	const inputRef = useRef<HTMLInputElement>(null);
	useEffect(() => {
		if (inputRef.current) {
			inputRef.current.focus();
		}
	}, []);

	const onSubmit = async () => {
		await editBio(accessToken, editedBio.trim());
		await fetchUserInformation(accessToken, currentUser, setCurrentUser);
		navigate('/account/edit');
	};

	return (
		<EditLayout>
			<EditHeader title="소개" onClickSave={onSubmit} />
			<EditContainer>
				<input
					type="text"
					value={editedBio}
					maxLength={150}
					ref={inputRef}
					onChange={(e) => setEditedBio(e.target.value)}
				/>
			</EditContainer>
		</EditLayout>
	);
}
