import { useEffect, useRef, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import styled from 'styled-components';

import { editPost, getPost } from '../../apis/post';
import PostHeader from '../../components/Post/PostHeader';
import PostImage from '../../components/Post/PostImage';
import { useUserContext } from '../../contexts/UserContext';
import { getColor } from '../../styles/Theme';
import { PostType } from '../../types';

const Container = styled.div`
	display: flex;
	flex-direction: column;
	height: 100%;
`;

const TextAreaWrapper = styled.div`
	width: 100%;
	flex-grow: 1;
	& > textarea {
		width: 100%;
		height: auto;
		resize: none;
		border: none;
		box-sizing: border-box;
	}
`;

const HeaderContainer = styled.div`
	width: 100%;
	display: flex;
	flex-direction: row;
	align-items: center;
	border-bottom: 1px solid ${getColor('grey')};
	margin-bottom: 1rem;
	padding-bottom: 1rem;
	& h4 {
		margin: 0;
	}
	& button {
		margin: 0;
		border: 0;
		padding: 0;
		background: none;
		font-size: 1rem;
		cursor: pointer;
	}
	& > .title {
		flex: 1 1 0;
		display: flex;
		justify-content: center;
		align-items: center;
	}
`;

export default function EditPost() {
	const [post, setPost] = useState<PostType | null>(null);
	const [content, setContent] = useState('');
	const inputRef = useRef<HTMLTextAreaElement | null>(null);

	const { accessToken } = useUserContext();

	const { id } = useParams();

	const navigate = useNavigate();

	useEffect(() => {
		const fetchPost = async () => {
			if (id !== undefined && Number.isInteger(Number(id)) && post === null) {
				try {
					const fetchPost = await getPost(Number(id), accessToken);
					if (!fetchPost) {
						return;
					}
					setPost(fetchPost);
					setContent(fetchPost.content);
					return;
				} catch {
					return;
				}
			}
		};

		fetchPost();
	}, []);

	useEffect(() => {
		if (inputRef !== null && inputRef.current) {
			inputRef.current.style.height = 'auto';
			inputRef.current.style.height = inputRef.current.scrollHeight + 'px';
		}
	});

	return (
		post && (
			<Container>
				<HeaderContainer>
					<button
						onClick={() => {
							navigate(-1);
						}}
					>
						취소
					</button>
					<span className="title">
						<h4>정보 수정</h4>
					</span>
					<button
						onClick={async () => {
							const result = await editPost(post.id, content, accessToken);
							if (result?.status === 'success') navigate(-1);
						}}
					>
						확인
					</button>
				</HeaderContainer>
				<PostHeader
					user={post.user}
					showMenu={() => {}}
					blockInteraction={true}
				/>
				<PostImage media={post.media} />
				<TextAreaWrapper>
					<textarea
						value={content}
						onChange={(e) => {
							setContent(e.target.value);
							e.currentTarget.style.height = 'auto';
							e.currentTarget.style.height =
								e.currentTarget.scrollHeight + 'px';
						}}
						ref={inputRef}
						autoFocus
					></textarea>
				</TextAreaWrapper>
			</Container>
		)
	);
}
