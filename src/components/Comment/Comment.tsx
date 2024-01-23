import styled from 'styled-components';

import likeIcon from '../../assets/Images/Post/like.svg';
import Icon from '../../shared/Icon';
import { getColor } from '../../styles/Theme';
import { CommentType } from '../../types';

type CommentProps = {
	comment: CommentType;
};

const CommentContainer = styled.div`
	display: flex;
	flex-direction: row;
	align-items: flex-start;
	gap: 1rem;
	& > .profile {
		width: 2rem;
		height: 2rem;
		border-radius: 70%;
		overflow: hidden;
		display: inline;
		border: 1px solid ${getColor('grey')};
	}
	& > .profile > img {
		margin: 0;
		width: 100%;
		height: 100%;
		object-fit: cover;
	}
	& > .username-content-box {
		display: flex;
		flex-direction: column;
		flex: 1 1 0;
	}
	& > .username-content-box > .username {
		font-weight: 600;
	}
	& > .like-box {
		display: flex;
		flex-direction: column;
		align-content: center;
	}
	& > .like-box > img {
		margin: 0;
		width: 1.5rem;
	}
	& > .like-box > .like-num {
		text-align: center;
		font-size: 0.7rem;
	}
`;

export default function Comment({ comment }: CommentProps) {
	return (
		<CommentContainer>
			<div className="profile">
				<img src={comment.user.profileImageUrl} alt="프로필 이미지" />
			</div>
			<div className="username-content-box">
				<span className="username">{comment.user.username}</span>
				<span>{comment.content}</span>
			</div>
			<div className="like-box">
				<Icon src={likeIcon} />
				<span className="like-num">30</span>
			</div>
		</CommentContainer>
	);
}
