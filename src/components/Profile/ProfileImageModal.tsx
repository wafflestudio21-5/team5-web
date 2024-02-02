import { ChangeEvent, useRef } from 'react';
import styled from 'styled-components';

import {
	addProfileImage,
	deleteProfileImage,
	fetchUserInformation,
} from '../../apis/account.ts';
import addImageIcon from '../../assets/Images/Profile/Edit/add-image.svg';
import deleteImageIcon from '../../assets/Images/Profile/Edit/delete-image.svg';
import { useUserContext } from '../../contexts/UserContext.tsx';
import Icon from '../../shared/Icon.tsx';
import Modal from '../../shared/Modal/Modal.tsx';
import { getColor } from '../../styles/Theme.tsx';

const ProfileImageModalContainer = styled.div`
	height: 20%;
`;

const CellContainer = styled.div`
	display: flex;
	flex-direction: column;
	align-items: flex-start;

	width: 100%;
	margin-top: 1rem;
`;

const Cell = styled.div`
	display: flex;
	flex-direction: row;
	align-items: center;

	width: 100%;

	&:hover {
		cursor: pointer;
	}

	& .delete {
		color: ${getColor('red')};
	}
`;

type Props = {
	close: () => void;
	isClosing: boolean;
	// setProfileImageModalState: (state: modalStateType) => void;
};

export default function ProfileImageModal({
	close,
	isClosing,
	// setProfileImageModalState,
}: Props) {
	const { accessToken, currentUser, setCurrentUser } = useUserContext();
	const profileImageRef = useRef<HTMLInputElement>(null);

	const onClickAddProfileImage = () => {
		if (profileImageRef.current) {
			profileImageRef.current.click();
		}
	};

	const onClickDeleteProfileImage = async () => {
		close();
		await deleteProfileImage(accessToken);
		await fetchUserInformation(accessToken, currentUser, setCurrentUser);
	};

	const handleFileChange = async (e: ChangeEvent<HTMLInputElement>) => {
		if (e.target.files && e.target.files.length > 0) {
			const file = e.target.files[0];
			const formData = new FormData();
			formData.append('file', file);

			close();
			await addProfileImage(accessToken, formData);
			await fetchUserInformation(accessToken, currentUser, setCurrentUser);
		}
	};

	return (
		<Modal onBackgroundClick={close} isClosing={isClosing}>
			<ProfileImageModalContainer>
				<hr />
				<CellContainer>
					<Cell onClick={onClickAddProfileImage}>
						<Icon src={addImageIcon} alt="프로필 사진 추가" />
						<p>새로운 프로필 사진</p>
						<input
							type="file"
							style={{ display: 'none' }}
							ref={profileImageRef}
							accept="image/*"
							onChange={handleFileChange}
						/>
					</Cell>
					<Cell onClick={onClickDeleteProfileImage}>
						<Icon src={deleteImageIcon} alt="현재 사진 삭제" />
						<p className="delete">현재 사진 삭제</p>
					</Cell>
				</CellContainer>
			</ProfileImageModalContainer>
		</Modal>
	);
}
