import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

import { PostListProps } from '../../types';

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

export default function PostList({
	previews,
	callbackUrl,
	useHashtag,
}: PostListProps) {
	const navigate = useNavigate();

	return (
		<Wrapper>
			{previews.length > 0 &&
				previews.map((preview) => (
					<div
						className="image-wrapper"
						onClick={() => {
							if (useHashtag) {
								navigate(`${callbackUrl}#post${preview.id}`);
							} else {
								navigate(`${callbackUrl}/${preview.id}`);
							}
						}}
					>
						<img src={preview.thumbnailUrl} alt="게시물 이미지" />
					</div>
				))}
		</Wrapper>
	);
}
