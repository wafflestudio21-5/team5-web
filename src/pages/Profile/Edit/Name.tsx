// import { useState } from 'react';
// import styled from 'styled-components';
//
// import { useUserContext } from '../../../contexts/UserContext.tsx';
// import { getColor } from '../../../styles/Theme.tsx';
//
// import EditHeader from './EditHeader.tsx';
//
// const EditNameLayout = styled.div`
// 	width: 100%;
// 	display: flex;
// 	flex-direction: column;
// 	justify-content: center;
// 	align-items: flex-start;
//
// 	& p {
// 		color: ${getColor('grey')};
// 		margin-bottom: 0.4rem;
// 	}
//
// 	& input {
// 		font-size: 1.2rem;
// 		width: 100%;
// 		margin-bottom: 1rem;
// 		padding: 0.5rem 0;
//
// 		border: none;
// 		border-bottom: 1px solid ${getColor('lightGrey')};
//
// 		&:focus {
// 			outline: none;
// 		}
// 	}
// `;
//
// export default function Name() {
// 	const { name, setName } = useUserContext();
// 	const [editedName, setEditedName] = useState(name);
//
// 	return (
// 		<EditNameLayout>
// 			<EditHeader title="이름" onClickSave={} />
// 			<p>이름</p>
// 			<input type="text" id="이름" value={editedName} />
// 			<p>
// 				사람들이 이름, 별명 또는 비즈니스 이름 등 회원님의 알려진 이름을
// 				사용하여 회원님의 계정을 찾을 수 있도록 도와주세요
// 			</p>
// 			<p>이름은 14일 동안 최대 두 번까지 변경할 수 있습니다.</p>
// 		</EditNameLayout>
// 	);
// }
