import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

import { editUsername, fetchUserInformation } from '../../../apis/account.ts';
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
		margin-bottom: 0.5rem;
		padding: 0.5rem 0;

		border: none;
		border-bottom: 1px solid ${getColor('blue')};

		&:focus {
			outline: none;
		}
	}
`;

export default function Username() {
	const { accessToken, setAccessToken, currentUser, setCurrentUser, username } =
		useUserContext();
	const [editedUsername, setEditedUsername] = useState(username);

	const navigate = useNavigate();

	// 입력창 자동 focus
	const inputRef = useRef<HTMLInputElement>(null);
	useEffect(() => {
		if (inputRef.current) {
			inputRef.current.focus();
		}
	}, []);

	const onSubmit = async () => {
		const newAccessToken = await editUsername(accessToken, editedUsername);

		if (newAccessToken) {
			setAccessToken(newAccessToken);

			const newCurrentUser = {
				...currentUser,
				username: editedUsername.trim(),
			};

			await fetchUserInformation(
				newAccessToken,
				newCurrentUser,
				setCurrentUser
			);
			navigate('/account/edit');
		}
	};

	return (
		<EditLayout>
			<EditHeader
				title="사용자 이름"
				onClickSave={editedUsername.trim().length === 0 ? () => {} : onSubmit}
			/>
			<EditContainer>
				<input
					type="text"
					value={editedUsername}
					maxLength={30}
					ref={inputRef}
					onChange={(e) => setEditedUsername(e.target.value)}
				/>
				<p>14일간 사용자 이름을 다시 {username}(으)로 변경할 수 있습니다.</p>
			</EditContainer>
		</EditLayout>
	);
}
