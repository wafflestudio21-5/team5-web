import axios from 'axios';
import { useState } from 'react';
import styled from 'styled-components';

import commentIcon from '../../assets/Images/Post/comment.svg';
import likeIcon from '../../assets/Images/Post/like.svg';
import likedIcon from '../../assets/Images/Post/liked.svg';
import saveIcon from '../../assets/Images/Post/save.svg';
import shareIcon from '../../assets/Images/Post/share.svg';
import Icon from '../../shared/Icon';
import { getColor } from '../../styles/Theme';
import { PostType } from '../../types';

const Container = styled.div`
	display: flex;
	flex-direction: column;
	width: 100%;
	height: fit-content;
`;

const IconBar = styled.div`
	display: grid;
	align-items: center;
	grid-template-columns: 1fr 1fr;
	margin-top: 0.25rem;
	margin-bottom: 0.25rem;
	& > .like-comment-share {
		display: flex;
		flex-direction: row;
		justify-content: flex-start;
	}
	& .icon-box {
		padding: 0.5rem;
		cursor: pointer;
	}
	& .icon-box:hover {
		opacity: 0.3;
	}
	& .icon-box:first-child {
		margin-left: -0.5rem;
	}
	& > .save {
		margin-left: auto;
		margin-right: 0;
	}
`;

const TextBox = styled.div`
	line-height: 18px;
	font-size: 14px;
	&.margin {
		margin-top: 0.5rem;
	}
	&.secondary-text {
		color: ${getColor('grey')};
	}
	&.more-comment {
		cursor: pointer;
	}
	& .like-num {
		font-weight: 600;
		cursor: pointer;
	}
	& .username {
		font-weight: 700;
		cursor: pointer;
	}
	& .username:hover {
		color: ${getColor('grey')};
	}
`;

type Props = {
	postData: PostType | null;
	showComment: () => void;
};

export default function ReactSection({ postData, showComment }: Props) {
	const [liked, setLiked] = useState(false);
	const [saved, setSaved] = useState(false);

	return (
		postData && (
			<Container>
				<IconBar>
					<div className="like-comment-share">
						<div
							className="icon-box"
							onClick={() => {
								if (liked) {
									axios.post(`/api/v1/posts/${postData.postId}/likes`);
								} else {
									axios.delete(`/api/v1/posts/${postData.postId}/likes`);
								}
								setLiked(!liked);
							}}
						>
							{liked ? (
								<Icon src={likedIcon} alt="좋아요 취소" />
							) : (
								<Icon src={likeIcon} alt="좋아요" />
							)}
						</div>
						<div className="icon-box" onClick={showComment}>
							<Icon src={commentIcon} />
						</div>
						<div className="icon-box">
							<Icon src={shareIcon} />
						</div>
					</div>
					<div
						className="save"
						onClick={() => {
							if (saved) {
								axios.post(`/api/v1/posts/${postData.postId}/save`);
							} else {
								axios.delete(`/api/v1/posts/${postData.postId}/save`);
							}
							setSaved(!saved);
						}}
					>
						<div className="icon-box">
							<Icon src={saveIcon} />
						</div>
					</div>
				</IconBar>
				<TextBox>
					<span className="like-num">좋아요 {postData.likesCount}개</span>
				</TextBox>
				<TextBox className="margin">
					<span className="username">{postData.username}</span>{' '}
					{postData.content}
				</TextBox>
				<TextBox
					className="margin secondary-text more-comment"
					onClick={showComment}
				>
					댓글 {postData.commentsCount}개 모두 보기
				</TextBox>
			</Container>
		)
	);
}
