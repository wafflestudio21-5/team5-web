import styled from 'styled-components';

import { getColor } from '../styles/Theme.tsx';
import { UserType } from '../types.ts';

const MiniProfileContainer = styled.div`
	display: flex;
	flex-direction: row;
	width: 100%;
	height: fit-content;
	padding: 0.5rem 1rem;

	& img {
		width: 3rem;
		height: 3rem;
		border-radius: 50%;
		overflow: hidden;
	}

	& div {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: flex-start;
	}

	& p .username {
		font-weight: 700;
	}

	& p .name {
		font-weight: 500;
		color: ${getColor('grey')};
	}

	& button {
		width: 45%;
		margin: 0.5rem;

		font-size: 1rem;
		font-weight: 700;
		padding: 0.5rem 1rem;

		border: none;
		border-radius: 0.5rem;

		&:hover {
			cursor: pointer;
		}
	}
`;

export default function MiniProfile({ user }: { user: UserType }) {
	return (
		<MiniProfileContainer>
			<img src={user.profileImageUrl} alt="프로필 사진" />
			<div>
				<p className="username">{user.username}</p>
				<p className="name">{user.name}</p>
			</div>
			<button>버튼</button>
		</MiniProfileContainer>
	);
}
