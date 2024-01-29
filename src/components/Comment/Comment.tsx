import { useState } from 'react';
import styled from 'styled-components';

import { handleCommentLike } from '../../apis/post';
import likeIcon from '../../assets/Images/Post/like.svg';
import likedIcon from '../../assets/Images/Post/liked.svg';
import DefaultProfileIcon from '../../assets/Images/Profile/default-profile.svg';
import { useUserContext } from '../../contexts/UserContext';
import Icon from '../../shared/Icon';
import { getColor } from '../../styles/Theme';
import { CommentType } from '../../types';

type CommentProps = {
	comment: CommentType;
	handlePostReply: (comment: CommentType) => void;
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

const TextBox = styled.div`
	line-height: 18px;
	font-size: 14px;
	cursor: pointer;
	&.secondary-text {
		color: ${getColor('grey')};
	}
`;

export default function Comment({ comment, handlePostReply }: CommentProps) {
	const [liked, setLiked] = useState(comment.liked);

	const { accessToken } = useUserContext();

	return (
		<CommentContainer>
			<div className="profile">
				<img
					src={
						comment.user.profileImageUrl !== ''
							? comment.user.profileImageUrl
							: DefaultProfileIcon
					}
					alt="프로필 이미지"
				/>
			</div>
			<div className="username-content-box">
				<span className="username">{comment.user.username}</span>
				<span>{comment.text}</span>
				<TextBox
					className="secondary-text"
					onClick={() => handlePostReply(comment)}
				>
					답글 달기
				</TextBox>
			</div>
			<div className="like-box">
				<Icon
					src={liked ? likedIcon : likeIcon}
					onClick={async () => {
						const result = await handleCommentLike(
							comment.id,
							liked,
							accessToken
						);
						if (result?.status === 'success') setLiked(!liked);
					}}
				/>
				<span className="like-num">{comment.likeCount}</span>
			</div>
		</CommentContainer>
	);
}
