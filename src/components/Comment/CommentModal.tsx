import { useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

import { getPostComment } from '../../apis/post';
import { useUserContext } from '../../contexts/UserContext';
import Modal from '../../shared/Modal/Modal';
import { getColor } from '../../styles/Theme';
import users from '../../test/data/users.json';
import { CommentPageType, PostType } from '../../types';

import CommentInput from './CommentInput';
import CommentList from './CommentList';

const ModalContent = styled.div`
	display: flex;
	flex-direction: column;
	gap: 0.5rem;
	width: 430px;
	padding: 0.5rem;
	background-color: ${getColor('grey')};
	border-radius: 0.5rem 0.5rem 0 0;
`;

type CommentFetchStatus = 'pending' | 'complete' | 'fail';

type OptionType = {
	onScrollEnd?: () => void;
};

type ReturnType = {
	isEnd: boolean;
};

export default function CommentModal({
	post,
	close,
	isClosing,
}: {
	post: PostType | null;
	close: () => void;
	isClosing: boolean;
}) {
	const [comments, setComments] = useState<CommentPageType>({
		comments: [],
		page: 0,
		total: 0,
		limit: 0,
	});

	const [status, setStatus] = useState<CommentFetchStatus>('pending');

	const { accessToken } = useUserContext();

	const navigate = useNavigate();

	const lockScroll = useCallback(() => {
		document.body.style.overflow = 'hidden';
	}, []);

	const unlockScroll = useCallback(() => {
		document.body.style.overflow = '';
	}, []);

	const useInfiniteScroll = ({ onScrollEnd }: OptionType): ReturnType => {
		const [isEnd, setIsEnd] = useState(false);

		const handleScroll = async () => {
			const scrollHeight = document.documentElement.scrollHeight;
			const scrollTop = document.documentElement.scrollTop;
			const clientHeight = document.documentElement.clientHeight;

			if (scrollTop + clientHeight >= scrollHeight) {
				setIsEnd(true);
				lockScroll();
				if (onScrollEnd) await onScrollEnd();
				await unlockScroll();
				await setIsEnd(false);
			}
		};

		useEffect(() => {
			window.addEventListener('scroll', handleScroll);
			return () => window.removeEventListener('scroll', handleScroll);
		}, []);

		return { isEnd };
	};

	useEffect(() => {
		const fetchHomeFeedData = async () => {
			if (
				post &&
				status === 'pending' &&
				comments.total / comments.limit > comments.page
			) {
				try {
					const commentsFetch = await getPostComment(
						post.id,
						comments.page + 1,
						accessToken
					);
					if (!commentsFetch) {
						setStatus('fail');
						return;
					}

					setComments({
						comments: [...comments.comments, ...commentsFetch.comments],
						page: commentsFetch.page,
						total: commentsFetch.total,
						limit: commentsFetch.limit,
					});
					setStatus('complete');
				} catch {
					navigate('/');
					setStatus('fail');
				}
			} else {
				setStatus('complete');
			}
		};

		fetchHomeFeedData();
	}, [accessToken, comments, navigate, post, status]);

	const { isEnd } = useInfiniteScroll({
		onScrollEnd: () => {
			setStatus('pending');
		},
	});

	return (
		post && (
			<Modal onBackgroundClick={close} isClosing={isClosing}>
				<ModalContent>
					<h3>댓글</h3>
					<CommentList comments={comments.comments} />
					{isEnd && <>loading...</>}
					<CommentInput post={post} user={users[1]} commentType={'comment'} />
					{/*위 user props에는 로그인한 사용자의 정보가 전달되어야함*/}
				</ModalContent>
			</Modal>
		)
	);
}
