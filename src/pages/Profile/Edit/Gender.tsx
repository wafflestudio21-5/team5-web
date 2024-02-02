import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

import { editGender, fetchUserInformation } from '../../../apis/account.ts';
import { useUserContext } from '../../../contexts/UserContext.tsx';
import { getColor } from '../../../styles/Theme.tsx';

import CancelHeader from '../../../shared/Header/CancelHeader.tsx';

const EditLayout = styled.div`
	width: 100%;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;

	box-shadow: 0 12px 5px -7px ${getColor('lightGrey')};
`;

const EditContainer = styled.div`
	width: 90%;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: flex-start;

	& p {
		color: ${getColor('grey')};
		font-size: 0.9rem;
	}
`;

const Cell = styled.div`
	display: flex;
	flex-direction: row;
	justify-content: space-between;
	align-items: center;
	width: 100%;

	& p {
		color: ${getColor('black')};
		font-size: 1.2rem;
	}
`;

const CustomGenderContainer = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: flex-start;
	width: 100%;

	& p {
		color: ${getColor('grey')};
		font-size: 0.9rem;
		margin: 0;
	}

	& p.blank {
		color: ${getColor('red')};
	}

	& input {
		font-size: 1.2rem;
		width: 100%;
		margin-bottom: 0.5rem;
		padding: 0.5rem 0;

		border: none;
		border-bottom: 1px solid ${getColor('lightGrey')};

		&:focus {
			outline: none;
		}
	}
`;

const RadioButton = styled.input`
	appearance: none;
	margin: 0;

	width: 1.7rem;
	height: 1.7rem;

	border: 2px solid ${getColor('darkGrey')};
	border-radius: 50%;

	&:checked {
		border: 9px solid ${getColor('blue')};
	}
`;

export default function Gender() {
	const { accessToken, currentUser, setCurrentUser, gender, isCustomGender } =
		useUserContext();
	const [editedGender, setEditedGender] = useState(gender);
	const [editedCustomGender, setEditedCustomGender] = useState(
		isCustomGender ? gender : ''
	);
	const [editedIsCustomGender, setEditedIsCustomGender] =
		useState(isCustomGender);

	const navigate = useNavigate();

	// 입력창 자동 focus
	const inputRef = useRef<HTMLInputElement>(null);
	useEffect(() => {
		if (editedIsCustomGender && inputRef.current) {
			inputRef.current.focus();
		}
	}, [editedIsCustomGender]);

	const onSubmit = async () => {
		if (editedIsCustomGender) {
			await editGender(
				accessToken,
				editedCustomGender.trim(),
				editedIsCustomGender
			);
		} else {
			await editGender(accessToken, editedGender, editedIsCustomGender);
		}
		await fetchUserInformation(accessToken, currentUser, setCurrentUser);
		navigate('/account/edit');
	};

	return (
		<EditLayout>
			<CancelHeader title="성별" onClickSave={onSubmit} />
			<EditContainer>
				<p>공개 프로필에 포함되지 않습니다.</p>
				<Cell
					onClick={() => {
						setEditedGender('female');
						setEditedIsCustomGender(false);
					}}
				>
					<p>여성</p>
					<RadioButton type="radio" checked={editedGender === 'female'} />
				</Cell>
				<Cell
					onClick={() => {
						setEditedGender('male');
						setEditedIsCustomGender(false);
					}}
				>
					<p>남성</p>
					<RadioButton type="radio" checked={editedGender === 'male'} />
				</Cell>
				<Cell
					onClick={() => {
						setEditedIsCustomGender(true);
						setEditedGender('');
					}}
				>
					<p>직접 지정</p>
					<RadioButton type="radio" checked={editedIsCustomGender} />
				</Cell>
				{editedIsCustomGender && (
					<CustomGenderContainer>
						<p className={editedCustomGender === '' ? 'blank' : ''}>
							{editedCustomGender === ''
								? '성별을 비워둘 수 없습니다.'
								: '직접 지정 성별'}
						</p>
						<input
							type="text"
							value={editedCustomGender}
							maxLength={30}
							ref={inputRef}
							onChange={(e) => setEditedCustomGender(e.target.value)}
						/>
					</CustomGenderContainer>
				)}
				<Cell
					onClick={() => {
						setEditedGender('unknown');
						setEditedIsCustomGender(false);
					}}
				>
					<p>밝히고 싶지 않음</p>
					<RadioButton
						type="radio"
						checked={!editedGender || editedGender === 'unknown'}
					/>
				</Cell>
			</EditContainer>
		</EditLayout>
	);
}
