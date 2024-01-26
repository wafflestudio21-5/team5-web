import axios from 'axios';
import { useEffect, useState } from 'react';
import styled from 'styled-components';

import { getColor } from '../../styles/Theme';
import { CommentType, MiniProfileType, PostType } from '../../types';

const CommentInputContainer = styled.div`
	display: flex;
	flex-direction: row;
	position: sticky;
	bottom: 0;
	border-top: 1px solid ${getColor('grey')};
	width: 100%;
	gap: 1rem;
	margin-top: 1rem;
	padding-top: 1rem;
	padding-bottom: 1rem;
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
		padding: 1px;
	}
	& > .input-btn-wrapper > textarea {
		width: 100%;
		overflow-y: hidden;
		resize: none;
		border: none;
		padding: 0;
		::placeholder {
			text-align: center;
		}
		:focus {
			outline: none;
		}
		:focus-visible {
			outline: none;
		}
	}
`;

type CommentInputProps = {
	post: PostType;
	user: MiniProfileType; // 댓글을 쓰는 사용자 정보
	commentType: 'comment' | 'reply'; // 입력하는 댓글이 게시물의 댓글인지 댓글의 대댓글인지
	comment?: CommentType; // 만약 댓글의 대댓글의 경우 해당 댓글을 입력받음
};

export default function CommentInput({
	post,
	user,
	commentType,
	comment,
}: CommentInputProps) {
	const [content, setContent] = useState('');

	useEffect(() => {
		if (commentType === 'reply' && comment) {
			setContent(comment.user.username);
		} else {
			setContent('');
		}
	}, [comment, commentType]);

	return (
		<CommentInputContainer>
			<div className="profile-image-wrapper">
				<img src={user.profileImageUrl} />
			</div>
			<div className="input-btn-wrapper">
				<textarea
					rows={1}
					value={content}
					onChange={(e) => {
						setContent(e.target.value);
						e.currentTarget.style.height = 'auto';
						e.currentTarget.style.height = e.currentTarget.scrollHeight + 'px';
					}}
					placeholder={user.username + '(으)로 댓글 달기...'}
				></textarea>
				{content !== '' && (
					<button
						onClick={() => {
							if (content !== '') {
								if (commentType === 'reply' && comment) {
									axios
										.post(`/api/v1/comments/${comment.id}/replies`, {
											content: content,
										})
										.then((res) => {
											if (res.status === 201) {
												setContent('');
											}
										});
								} else if (commentType === 'comment' && post.id) {
									axios
										.post(`/api/v1/posts/${post.id}/comments`, {
											content: content,
										})
										.then((res) => {
											if (res.status === 201) {
												setContent('');
											}
										});
								}
							}
						}}
					></button>
				)}
			</div>
		</CommentInputContainer>
	);
}
