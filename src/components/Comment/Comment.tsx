import { useEffect, useState } from 'react';
import styled from 'styled-components';

import { getReply, handleCommentLike } from '../../apis/post';
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
	}
`;

const LikeBox = styled.div`
	display: flex;
	flex-direction: column;
	align-content: center;
	opacity: 0.5;
	& > img {
		margin: 0;
		width: 1.5rem;
	}
	& > .like-num {
		text-align: center;
		font-size: 0.7rem;
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
}: CommentProps) {
	const [replies, setReplies] = useState<CommentPageType>();
	const [liked, setLiked] = useState(comment.liked);
	const [showReply, setShowReply] = useState(false);

	const { accessToken, userId } = useUserContext();

	useEffect(() => {
		const fetchCommentData = async () => {
			if (showReply && comment) {
				try {
					const repliesFetch = await getReply(comment.id, 1, accessToken);
					if (!repliesFetch) {
						return;
					}

					setReplies({
						...repliesFetch,
					});
				} catch {
					console.log('');
				}
			} else {
				console.log('');
			}
		};

		fetchCommentData();
	}, [accessToken, comment, showReply]);

	return (
		<CommentContainer>
			<Profile>
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
				<span className="username">{comment.user.username}</span>
				<span>{comment.text}</span>
				<div className="reaction-bar">
					<TextBox
						className="secondary-text"
						onClick={() => handlePostReply(comment)}
					>
						답글 달기
					</TextBox>
					{comment.user.userId === userId && (
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
			</LikeBox>
			{showReply &&
				replies?.content.map((reply) => {
					return (
						<>
							<ReplyContent>
								<Profile className="reply">
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
									<span className="username">{reply.user.username}</span>
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
										{reply.user.userId === userId && (
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
								</UsernameContentBox>
							</ReplyContent>
							<LikeBox>
								<Icon src={reply.liked ? likedIcon : likeIcon} />
								<span className="like-num">{reply.likeCount}</span>
							</LikeBox>
						</>
					);
				})}
		</CommentContainer>
	);
}
