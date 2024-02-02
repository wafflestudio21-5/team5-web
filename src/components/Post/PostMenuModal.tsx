import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

import {
	cancelRequestFollowToPrivateUser,
	followPublicUser,
	getUserFollowStatus,
	getUserInformation,
	requestFollowToPrivateUser,
	unfollowUser,
} from '../../apis/user';
import DeleteIcon from '../../assets/Images/Post/delete.svg';
import EditIcon from '../../assets/Images/Post/edit.svg';
import { useUserContext } from '../../contexts/UserContext';
import Icon from '../../shared/Icon.tsx';
import Modal from '../../shared/Modal/Modal';
import { getColor } from '../../styles/Theme';
import { PostType } from '../../types';

const PostMenuModalContainer = styled.div`
	height: 40%;
`;

const CellContainer = styled.div`
	display: flex;
	flex-direction: column;
	align-items: flex-start;

	width: 100%;
	margin-top: 1rem;
`;

const Cell = styled.div`
	display: flex;
	flex-direction: row;
	align-items: center;

	width: 100%;

	&:hover {
		cursor: pointer;
	}

	& .red {
		font-weight: 600;
		color: ${getColor('red')};
	}
`;

export default function PostMenuModal({
	post,
	close,
	isClosing,
	handleDeletePost,
}: {
	post: PostType | null;
	close: () => void;
	isClosing: boolean;
	handleDeletePost: (postId: number) => void;
}) {
	const { userId, accessToken } = useUserContext();

	const navigate = useNavigate();
	const [isFollowing, setIsFollowing] = useState(true);

	useEffect(() => {
		const fetchFollowing = async () => {
			if (userId !== post?.user.userId && post) {
				const result = await getUserFollowStatus(
					post?.user.username,
					accessToken
				);
				setIsFollowing(result);
			}
		};

		fetchFollowing();
	}, []);

	const handleFollow = async () => {
		if (post) {
			const userInfo = await getUserInformation(
				post.user.username,
				accessToken
			);
			if (!userInfo) {
				return;
			}
			if (userInfo.isPrivate) {
				const result = await requestFollowToPrivateUser(
					userInfo.username,
					accessToken
				);
				if (result) {
					setIsFollowing(true);
				}
			} else {
				const result = await followPublicUser(userInfo.username, accessToken);
				if (result) {
					setIsFollowing(true);
				}
			}
		}
	};

	const handleUnfollow = async () => {
		if (post) {
			const userInfo = await getUserInformation(
				post.user.username,
				accessToken
			);
			if (!userInfo) {
				return;
			}
			if (userInfo.isPrivate) {
				const isFollowing = await getUserFollowStatus(
					post?.user.username,
					accessToken
				);
				if (isFollowing) {
					const result = await unfollowUser(userInfo.username, accessToken);
					if (result) {
						setIsFollowing(false);
					}
				} else {
					const result = await cancelRequestFollowToPrivateUser(
						userInfo.username,
						accessToken
					);
					if (result) {
						setIsFollowing(false);
					}
				}
			} else {
				const result = await unfollowUser(userInfo.username, accessToken);
				if (result) {
					setIsFollowing(false);
				}
			}
		}
	};

	return (
		<Modal onBackgroundClick={close} isClosing={isClosing}>
			<PostMenuModalContainer>
				<CellContainer>
					{post?.user.userId !== userId &&
						(isFollowing ? (
							<Cell onClick={handleUnfollow}>
								<Icon src={EditIcon} />
								<p>팔로우 취소</p>
							</Cell>
						) : (
							<Cell onClick={handleFollow}>
								<Icon src={EditIcon} />
								<p>팔로우</p>
							</Cell>
						))}
					<Cell
						onClick={() => {
							navigate(`/${post?.user.username}`);
						}}
					>
						<Icon src={EditIcon} />
						<p>이 계정 정보</p>
					</Cell>
					{post?.user.userId === userId && (
						<>
							<Cell
								onClick={() => {
									navigate(`/post/edit/${post.id}`);
								}}
							>
								<Icon src={EditIcon} />
								<p>수정</p>
							</Cell>
							<Cell
								onClick={() => {
									handleDeletePost(post.id);
								}}
							>
								<Icon src={DeleteIcon} />
								<p className="red">삭제</p>
							</Cell>
						</>
					)}
				</CellContainer>
			</PostMenuModalContainer>
		</Modal>
	);
}
