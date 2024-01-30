import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

import { deleteComment, getPostComment } from '../../apis/post';
import { useUserContext } from '../../contexts/UserContext';
import Modal from '../../shared/Modal/Modal';
import { getColor } from '../../styles/Theme';
import {
	CommentPageType,
	CommentType,
	MiniProfileType,
	PostType,
} from '../../types';

import CommentInput from './CommentInput';
import CommentList from './CommentList';

const ModalContent = styled.div`
	display: flex;
	flex-direction: column;
	gap: 0.5rem;
	width: 430px;
	padding-bottom: 0.5rem;
	background-color: ${getColor('grey')};
	border-radius: 0.5rem 0.5rem 0 0;
	max-height: 70%;
`;

export default function CommentModal({
	post,
	close,
	isClosing,
}: {
	post: PostType | null;
	close: () => void;
	isClosing: boolean;
}) {
	const [comments, setComments] = useState<CommentPageType>();

	const [reload, setReload] = useState(true);
	const [commentType, setCommentType] = useState<'comment' | 'reply'>(
		'comment'
	);
	const [replyComment, setReplyComment] = useState<CommentType | null>(null);

	const { accessToken, currentUser } = useUserContext();

	const profile: MiniProfileType = {
		userId: currentUser?.userId ?? 0,
		username: currentUser?.username ?? '',
		profileImageUrl: currentUser?.profileImageUrl ?? '',
		name: currentUser?.name ?? '',
	};

	const navigate = useNavigate();

	useEffect(() => {
		const fetchCommentData = async () => {
			if (post && reload) {
				try {
					const commentsFetch = await getPostComment(post.id, 1, accessToken);
					if (!commentsFetch) {
						setReload(false);
						return;
					}

					setComments({
						...commentsFetch,
					});
					setReload(false);
				} catch {
					navigate('/');
					setReload(false);
				}
			} else {
				return;
			}
		};

		fetchCommentData();
	}, [reload]);

	const handlePostReply = (comment: CommentType) => {
		setCommentType('reply');
		setReplyComment(comment);
	};

	const handleCancelReply = () => {
		setCommentType('comment');
		setReplyComment(null);
	};

	const handleDeleteComment = async (comment: CommentType) => {
		const result = await deleteComment(comment.id, accessToken);
		if (result?.status === 'success' && comments) {
			setReload(true);
		}
	};

	return (
		post && (
			<Modal onBackgroundClick={close} isClosing={isClosing}>
				<ModalContent>
					<h3>댓글</h3>
					{comments && (
						<CommentList
							comments={comments.content}
							handlePostReply={handlePostReply}
							handleDeleteComment={handleDeleteComment}
							setReload={setReload}
						/>
					)}
					<CommentInput
						post={post}
						user={profile}
						commentType={commentType}
						comment={replyComment}
						handleCancelReply={handleCancelReply}
						setReload={setReload}
					/>
					{/*위 user props에는 로그인한 사용자의 정보가 전달되어야함*/}
				</ModalContent>
			</Modal>
		)
	);
}
