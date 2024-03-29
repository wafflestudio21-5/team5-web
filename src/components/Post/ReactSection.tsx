import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

import { handleLike, handleSave } from '../../apis/post';
import commentIcon from '../../assets/Images/Post/comment.svg';
import likeIcon from '../../assets/Images/Post/like.svg';
import likedIcon from '../../assets/Images/Post/liked.svg';
import saveIcon from '../../assets/Images/Post/save.svg';
import savedIcon from '../../assets/Images/Post/saved.svg';
import shareIcon from '../../assets/Images/Post/share.svg';
import { useUserContext } from '../../contexts/UserContext';
import Icon from '../../shared/Icon';
import { getColor } from '../../styles/Theme';
import { PostType } from '../../types';

const Container = styled.div`
	display: flex;
	flex-direction: column;
	width: 95%;
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
	white-space: pre-line;
	line-height: 18px;
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
	postData: PostType;
	showComment: () => void;
};

export default function ReactSection({ postData, showComment }: Props) {
	const [liked, setLiked] = useState(postData.liked);
	const [saved, setSaved] = useState(postData.saved);

	const { accessToken } = useUserContext();

	const createdDate = new Date(postData.createdAt);

	const navigate = useNavigate();

	return (
		postData && (
			<Container>
				<IconBar>
					<div className="like-comment-share">
						<div
							className="icon-box"
							onClick={async () => {
								const result = await handleLike(
									postData.id,
									liked,
									accessToken
								);
								if (result?.status === 'success') setLiked(!liked);
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
						onClick={async () => {
							const result = await handleSave(postData.id, saved, accessToken);
							if (result?.status === 'success') setSaved(!saved);
						}}
					>
						<div className="icon-box">
							{saved ? (
								<Icon src={savedIcon} alt="저장 취소" />
							) : (
								<Icon src={saveIcon} alt="저장" />
							)}
						</div>
					</div>
				</IconBar>
				<TextBox>
					<span className="like-num">
						좋아요{' '}
						{postData.likeCount +
							(liked === postData.liked ? 0 : postData.liked ? -1 : 1)}
						개
					</span>
				</TextBox>
				<TextBox className="margin">
					<span
						className="username"
						onClick={() => {
							navigate(`/${postData.user.username}`);
						}}
					>
						{postData.user.username}
					</span>{' '}
					{postData.content}
				</TextBox>
				{postData.commentCount > 0 && (
					<TextBox
						className="margin secondary-text more-comment"
						onClick={showComment}
					>
						댓글 {postData.commentCount}개 모두 보기
					</TextBox>
				)}
				<TextBox className="margin secondary-text more-comment">
					{createdDate.getFullYear() +
						'년 ' +
						(createdDate.getMonth() + 1) +
						'월 ' +
						createdDate.getDate() +
						'일'}
				</TextBox>
			</Container>
		)
	);
}
