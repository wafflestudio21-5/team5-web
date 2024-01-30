import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

import { PostType, PreviewType } from '../../types';

const Wrapper = styled.div`
	display: grid;
	grid-template-columns: 1fr 1fr 1fr;
	grid-gap: 2px;
	width: 100%;
	& > .image-wrapper {
		cursor: pointer;
		width: 100%;
		overflow: hidden;
		aspect-ratio: 1;
		display: flex;
		justify-content: center;
		align-items: center;
	}
	& > .image-wrapper > img {
		object-fit: cover;
		height: 100%;
		width: 100%;
	}
`;

type PostListProps = {
	posts?: PostType[];
	previews?: PreviewType[];
};

export default function PostList({ posts, previews }: PostListProps) {
	const navigate = useNavigate();

	if (posts === null && previews === null) return <></>;

	return (
		<Wrapper>
			{posts
				? posts.map((post) => (
						<div
							className="image-wrapper"
							onClick={() => {
								navigate(`/feed/${post.id}`);
							}}
						>
							<img src={post.media[0].url} alt="게시물 이미지" />
						</div>
					))
				: previews?.map((preview) => (
						<div
							className="image-wrapper"
							onClick={() => {
								navigate(`/feed/${preview.id}`);
							}}
						>
							<img src={preview.thumbnailUrl} alt="게시물 이미지" />
						</div>
					))}
		</Wrapper>
	);
}
