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
import { useUserContext } from '../../contexts/UserContext';
import Modal from '../../shared/Modal/Modal';
import { getColor } from '../../styles/Theme';
import { PostType } from '../../types';

const ModalContent = styled.div`
	display: flex;
	flex-direction: column;
	gap: 0.5rem;
	width: 430px;
	padding: 1rem;
	background-color: ${getColor('grey')};
	border-radius: 0.5rem 0.5rem 0 0;
`;

const ButtonGroup = styled.div`
	width: 100%;
	display: flex;
	flex-direction: column;
	border: 1px solid grey;
	border-radius: 0.5rem;
	overflow: hidden;
	justify-content: center;
	gap: 0;
	font-size: 0;
	& button {
		background-color: ${getColor('grey')};
		border: none;
		min-height: 2rem;
		font-size: 0.7rem;
	}
	& .critical {
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
	const [isFollwing, setIsFollwing] = useState(true);

	useEffect(() => {
		const fetchFollwing = async () => {
			if (userId !== post?.user.userId && post) {
				const result = await getUserFollowStatus(
					post?.user.username,
					accessToken
				);
				setIsFollwing(result);
			}
		};

		fetchFollwing();
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
					setIsFollwing(true);
				}
			} else {
				const result = await followPublicUser(userInfo.username, accessToken);
				if (result) {
					setIsFollwing(true);
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
						setIsFollwing(false);
					}
				} else {
					const result = await cancelRequestFollowToPrivateUser(
						userInfo.username,
						accessToken
					);
					if (result) {
						setIsFollwing(false);
					}
				}
			} else {
				const result = await unfollowUser(userInfo.username, accessToken);
				if (result) {
					setIsFollwing(false);
				}
			}
		}
	};

	return (
		<Modal onBackgroundClick={close} isClosing={isClosing}>
			<ModalContent>
				{post?.user.userId === userId ? (
					<></>
				) : (
					<ButtonGroup>
						{isFollwing ? (
							<button onClick={handleUnfollow}>팔로우 취소</button>
						) : (
							<button onClick={handleFollow}>팔로우</button>
						)}
					</ButtonGroup>
				)}

				<ButtonGroup>
					<button
						onClick={() => {
							navigate(`/${post?.user.username}`);
						}}
					>
						이 계정 정보
					</button>
					{post?.user.userId === userId && (
						<button
							onClick={() => {
								navigate(`/post/edit/${post.id}`);
							}}
						>
							수정
						</button>
					)}
					{post?.user.userId === userId && (
						<button
							onClick={() => {
								handleDeletePost(post.id);
							}}
							className="critical"
						>
							삭제
						</button>
					)}
				</ButtonGroup>
			</ModalContent>
		</Modal>
	);
}
