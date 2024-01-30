import { useState } from 'react';
import styled from 'styled-components';

import { MediaType } from '../../types';

const Container = styled.div`
	position: relative;
	width: 100%;
	top: 0;
	left: 0;
	display: flex;
`;

const Image = styled.img`
	width: 100%;
	position: relative;
`;

const MoveButton = styled.button`
	position: absolute;
	top: calc(50% - 0.625rem);
	width: 1.25rem;
	height: 1.25rem;
	padding: 0;
	border-radius: 70%;
	border: 0;
	background-color: rgba(245, 245, 245, 0.7);
	color: black;
	&.left {
		left: 1rem;
	}
	&.right {
		right: 1rem;
	}
`;

const IndexBar = styled.div`
	position: absolute;
	width: 100%;
	height: fit-content;
	bottom: 1rem;
	left: 0;
	padding: 0;
	display: flex;
	flex-direction: row;
	justify-content: center;
	& .dot {
		width: 0.375rem;
		height: 0.375rem;
		border-radius: 50%;
		background-color: rgba(255, 255, 255, 0.4);
		margin-right: 0.25rem;
	}
	& .select {
		background-color: rgb(255, 255, 255);
	}
`;

export default function PostImage({ media }: { media: MediaType[] }) {
	const [order, setOrder] = useState(0);
	return (
		<Container>
			<Image src={media[order].url} alt="post image" />
			{media.length > 1 && (
				<>
					{order > 0 && (
						<MoveButton className="left" onClick={() => setOrder(order - 1)}>
							&lt;
						</MoveButton>
					)}
					{order + 1 < media.length && (
						<MoveButton className="right" onClick={() => setOrder(order + 1)}>
							&gt;
						</MoveButton>
					)}
					<IndexBar>
						{media.map((m, index) => {
							console.log(m.order, index);
							return (
								<div
									className={`dot ${m.order === order + 1 ? 'select' : ''}`}
									key={m.order}
								></div>
							);
						})}
					</IndexBar>
				</>
			)}
		</Container>
	);
}
