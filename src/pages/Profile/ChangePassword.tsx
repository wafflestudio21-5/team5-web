import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

import { changePassword } from '../../apis/account.ts';
import { useUserContext } from '../../contexts/UserContext.tsx';
import { getColor } from '../../styles/Theme.tsx';

import EditHeader from './Edit/EditHeader.tsx';

const ChangePasswordLayout = styled.div`
	width: 100%;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
`;

const ChangePasswordContainer = styled.div`
	width: 90%;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: flex-start;

	& div {
		width: 100%;
		margin: 1rem 0;
	}

	& label {
		margin-bottom: 0.4rem;
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

	& p {
		color: ${getColor('red')};
		font-size: 0.9rem;
		margin: 0;
	}
`;

export default function ChangePassword() {
	const { accessToken } = useUserContext();
	const [oldPassword, setOldPassword] = useState<string>('');
	const [newPassword, setNewPassword] = useState<string>('');
	const [isValid, setIsValid] = useState<boolean>(true);

	const navigate = useNavigate();

	const pwdReg = /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,15}$/;

	const onClickChangePassword = async () => {
		if (!pwdReg.test(newPassword)) {
			setIsValid(false);
			return;
		}

		setIsValid(true);

		const result = await changePassword(accessToken, oldPassword, newPassword);
		if (result) {
			navigate(-1);
		}
	};

	return (
		<ChangePasswordLayout>
			<EditHeader title="비밀번호 변경" onClickSave={onClickChangePassword} />

			<ChangePasswordContainer>
				<div>
					<label htmlFor="old">기존 비밀번호</label>
					<input
						type="password"
						id="old"
						value={oldPassword}
						onChange={(e) => setOldPassword(e.target.value)}
					/>
				</div>
				<div>
					<label htmlFor="new">새 비밀번호</label>
					<input
						type="password"
						id="new"
						value={newPassword}
						onChange={(e) => setNewPassword(e.target.value)}
					/>
					{!isValid && (
						<p>
							비밀번호는 영어, 숫자, 특수문자를 포함한 8~15 길이의 문자열로
							입력해주세요.
						</p>
					)}
				</div>
			</ChangePasswordContainer>
		</ChangePasswordLayout>
	);
}
