import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

import {
	deleteReply,
	getReply,
	handleCommentLike,
	handleReplyLike,
} from '../../apis/post.ts';
import likeIcon from '../../assets/Images/Post/like.svg';
import likedIcon from '../../assets/Images/Post/liked.svg';
import DefaultProfileIcon from '../../assets/Images/Profile/default-profile.svg';
import { useUserContext } from '../../contexts/UserContext';
import Icon from '../../shared/Icon';
import { getColor } from '../../styles/Theme';
import { CommentPageType, CommentType } from '../../types';

type CommentProps = {
	comment: CommentType;
	handlePostReply: (comment: CommentType) => void;
	handleDeleteComment: (comment: CommentType) => void;
	setReload: (reload: boolean) => void;
	postAuthorId: number;
};

const CommentContainer = styled.div`
	display: grid;
	gap: 1rem;
	grid-template-columns: 2rem auto 1.5rem;
	& > Profile {
		grid-row: 1/2;
	}
	& > UsernameContentBox {
		grid-column: 2/3;
	}
	& > LikeBox {
		grid-column: 3/4;
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

const Profile = styled.div`
	width: 2rem;
	height: 2rem;
	border-radius: 70%;
	overflow: hidden;
	cursor: pointer;
	display: inline;
	border: 1px solid ${getColor('grey')};
	& > img {
		margin: 0;
		width: 100%;
		height: 100%;
		object-fit: cover;
	}
	&.reply {
		width: 1rem;
		height: 1rem;
	}
`;

const UsernameContentBox = styled.div`
	display: flex;
	flex-direction: column;
	flex: 1 1 0;
	& > .reaction-bar {
		display: flex;
		flex-direction: row;
		gap: 1rem;
	}
	& > .username {
		font-weight: 600;
		cursor: pointer;
	}
`;

const LikeBox = styled.div`
	display: flex;
	flex-direction: column;
	align-content: center;
	& > img {
		margin: 0;
		width: 1.5rem;
	}
	& > .like-num {
		text-align: center;
		font-size: 0.7rem;
	}
	& .blur {
		opacity: 0.5;
	}
`;

const ReplyContent = styled.div`
	grid-column: 2/3;
	gap: 1rem;
	display: flex;
	flex-direction: row;
`;

export default function Comment({
	comment,
	handlePostReply,
	handleDeleteComment,
	setReload,
	postAuthorId,
}: CommentProps) {
	const [replies, setReplies] = useState<CommentPageType>();
	const [showReply, setShowReply] = useState(false);

	const [replyReload, setReplyReload] = useState(true);

	const { accessToken, userId } = useUserContext();

	const navigate = useNavigate();

	useEffect(() => {
		const fetchCommentData = async () => {
			if (showReply && comment && replyReload) {
				try {
					const repliesFetch = await getReply(comment.id, 1, accessToken);
					if (!repliesFetch) {
						setReplyReload(false);
						return;
					}

					setReplies({
						...repliesFetch,
					});
					setReplyReload(false);
				} catch {
					setReplyReload(false);
					return;
				}
			} else {
				return;
			}
		};

		fetchCommentData();
	}, [accessToken, comment, showReply, replyReload]);

	const handleDeleteReply = async (reply: CommentType) => {
		const reuslt = await deleteReply(reply.id, accessToken);
		if (reuslt?.status === 'success' && replies) {
			setReplyReload(true);
			setReload(true);
		}
	};

	return (
		<CommentContainer>
			<Profile
				onClick={() => {
					navigate(`/${comment.user.username}`);
				}}
			>
				<img
					src={
						comment.user.profileImageUrl !== ''
							? comment.user.profileImageUrl
							: DefaultProfileIcon
					}
					alt="프로필 이미지"
				/>
			</Profile>
			<UsernameContentBox>
				<span
					className="username"
					onClick={() => {
						navigate(`/${comment.user.username}`);
					}}
				>
					{comment.user.username}
				</span>
				<span>{comment.text}</span>
				<div className="reaction-bar">
					<TextBox
						className="secondary-text"
						onClick={() => handlePostReply(comment)}
					>
						답글 달기
					</TextBox>
					{(comment.user.userId === userId || postAuthorId === userId) && (
						<TextBox
							className="secondary-text"
							onClick={() => {
								handleDeleteComment(comment);
							}}
						>
							삭제
						</TextBox>
					)}
				</div>
				{comment.replyCount > 0 && (
					<TextBox
						className="secondary-text"
						onClick={() => {
							setShowReply(!showReply);
						}}
					>
						{showReply
							? '-답글 숨기기'
							: `-답글 ${comment.replyCount}개 더 보기`}
					</TextBox>
				)}
			</UsernameContentBox>
			<LikeBox>
				<Icon
					src={comment.liked ? likedIcon : likeIcon}
					onClick={async () => {
						const result = await handleCommentLike(
							comment.id,
							comment.liked,
							accessToken
						);
						if (result?.status === 'success') setReload(true);
					}}
					className={comment.liked ? '' : 'blur'}
				/>
				<span className="like-num blur">{comment.likeCount}</span>
			</LikeBox>
			{showReply &&
				replies?.content.map((reply) => {
					return (
						<>
							<ReplyContent>
								<Profile
									className="reply"
									onClick={() => {
										navigate(`/${comment.user.username}`);
									}}
								>
									<img
										src={
											reply.user.profileImageUrl !== ''
												? reply.user.profileImageUrl
												: DefaultProfileIcon
										}
										alt="프로필 이미지"
									/>
								</Profile>
								<UsernameContentBox>
									<span
										className="username"
										onClick={() => {
											navigate(`/${comment.user.username}`);
										}}
									>
										{reply.user.username}
									</span>
									<span>{reply.text}</span>
									<div className="reaction-bar">
										<TextBox
											className="secondary-text"
											onClick={() =>
												handlePostReply({
													id: comment.id,
													user: reply.user,
													text: reply.text,
													createdAt: comment.createdAt,
													postId: reply.postId,
													replyCount: reply.replyCount,
													likeCount: reply.likeCount,
													liked: reply.liked,
												})
											}
										>
											답글 달기
										</TextBox>
										{(reply.user.userId === userId ||
											postAuthorId === userId) && (
											<TextBox
												className="secondary-text"
												onClick={() => {
													handleDeleteReply(reply);
												}}
											>
												삭제
											</TextBox>
										)}
									</div>
								</UsernameContentBox>
							</ReplyContent>
							<LikeBox>
								<Icon
									src={reply.liked ? likedIcon : likeIcon}
									onClick={async () => {
										const result = await handleReplyLike(
											reply.id,
											reply.liked,
											accessToken
										);
										if (result?.status === 'success') setReplyReload(true);
									}}
									className={comment.liked ? '' : 'blur'}
								/>
								<span className="like-num blur">{reply.likeCount}</span>
							</LikeBox>
						</>
					);
				})}
		</CommentContainer>
	);
}
