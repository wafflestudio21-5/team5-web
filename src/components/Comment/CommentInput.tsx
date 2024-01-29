import { useEffect, useState } from 'react';
import styled from 'styled-components';

import { postComment, postReply } from '../../apis/post';
import DefaultProfile from '../../assets/Images/Profile/default-profile.svg';
import { useUserContext } from '../../contexts/UserContext';
import { getColor } from '../../styles/Theme';
import { CommentType, MiniProfileType, PostType } from '../../types';

const CommentInputContainer = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	position: sticky;
	bottom: 0;
	width: 100%;
	margin-top: 1rem;
	& > .reply-info {
		justify-content: space-between;
		box-sizing: border-box;
		display: flex;
		flex-direction: row;
		width: 100%;
		background-color: ${getColor('grey')};
		color: ${getColor('darkGrey')};
		padding: 0.5rem;
	}
	& > .reply-info > button {
		background-color: transparent;
		border: none;
		color: ${getColor('darkGrey')};
	}
`;

const CommentInputFeildWrapper = styled.div`
	display: flex;
	flex-direction: row;
	border-top: 1px solid ${getColor('grey')};
	width: 100%;
	gap: 1rem;
	box-sizing: border-box;
	padding: 0.5rem 1rem 0.5rem 1rem;
	& > .profile-image-wrapper {
		width: 2rem;
		height: 2rem;
		border-radius: 70%;
		overflow: hidden;
		display: inline;
		border: 1px solid ${getColor('grey')};
	}
	& > .profile-image-wrapper > img {
		margin: 0;
		width: 100%;
		height: 100%;
		object-fit: cover;
	}
	& > .input-btn-wrapper {
		width: 100%;
		flex: 1 1 0;
		display: flex;
		flex-direction: row;
		align-items: flex-end;
		border: 1px solid ${getColor('blue')};
		border-radius: 1rem;
		overflow: hidden;
		padding: 0 1rem 0 1rem;
		gap: 0.5rem;
	}
	& > .input-btn-wrapper > .input-wrapper {
		width: 100%;
		height: 100%;
		display: flex;
		align-items: center;
	}
	& > .input-btn-wrapper > .input-wrapper > textarea {
		width: 100%;
		overflow-y: hidden;
		resize: none;
		border: none;
		padding: 0;
		::placeholder {
			text-align: center;
		}
	}
	& > .input-btn-wrapper > .input-wrapper > textarea:focus {
		outline: none;
	}
	& > .input-btn-wrapper > .btn-wrapper {
		display: flex;
		height: 100%;
		align-items: flex-end;
		cursor: pointer;
	}
	& > .input-btn-wrapper > .btn-wrapper > button {
		border: none;
		background-color: transparent;
		width: 2rem;
		height: 2rem;
		padding: 0;
		color: ${getColor('blue')};
		font-weight: 600;
		margin-bottom: 1px;
		margin-top: 1px;
	}
	& > .input-btn-wrapper > .btn-wrapper > button:focus {
		outline: none;
	}
`;

type CommentInputProps = {
	post: PostType;
	user: MiniProfileType; // 댓글을 쓰는 사용자 정보
	commentType: 'comment' | 'reply'; // 입력하는 댓글이 게시물의 댓글인지 댓글의 대댓글인지
	comment: CommentType | null; // 만약 댓글의 대댓글의 경우 해당 댓글을 입력받음
	handleCancelReply: () => void;
};

export default function CommentInput({
	post,
	user,
	commentType,
	comment,
	handleCancelReply,
}: CommentInputProps) {
	const [content, setContent] = useState('');

	const { accessToken } = useUserContext();

	useEffect(() => {
		if (commentType === 'reply' && comment) {
			setContent('@' + comment.user.username + ' ');
		} else {
			setContent('');
		}
	}, [comment, commentType]);

	return (
		<CommentInputContainer>
			{commentType === 'reply' && comment !== null && (
				<div className="reply-info">
					<span>{comment.user.username}에게 남긴 답글</span>
					<button onClick={handleCancelReply}>X</button>
				</div>
			)}
			<CommentInputFeildWrapper>
				<div className="profile-image-wrapper">
					<img
						src={
							user.profileImageUrl !== ''
								? user.profileImageUrl
								: DefaultProfile
						}
					/>
				</div>
				<div className="input-btn-wrapper">
					<div className="input-wrapper">
						<textarea
							rows={1}
							value={content}
							onChange={(e) => {
								setContent(e.target.value);
								e.currentTarget.style.height = 'auto';
								e.currentTarget.style.height =
									e.currentTarget.scrollHeight + 'px';
							}}
							placeholder={user.username + '(으)로 댓글 달기...'}
						></textarea>
					</div>
					{content !== '' && (
						<div className="btn-wrapper">
							<button
								onClick={async () => {
									if (content !== '') {
										if (commentType === 'reply' && comment) {
											const result = await postReply(
												comment.id,
												content,
												accessToken
											);
											if (result?.status) setContent('');
										} else if (commentType === 'comment' && post.id) {
											const result = await postComment(
												post.id,
												content,
												accessToken
											);
											if (result?.status) setContent('');
										}
									}
								}}
							>
								게시
							</button>
						</div>
					)}
				</div>
			</CommentInputFeildWrapper>
		</CommentInputContainer>
	);
}
