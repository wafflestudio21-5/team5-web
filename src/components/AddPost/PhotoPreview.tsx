import { useState } from 'react';
import styled from 'styled-components';
import { usePostContext } from '../../contexts/PostContext';

const Container = styled.div`
	width: 100%;
	margin-top: 1rem;
	overflow-x: auto;
	display: inline-flex;
	&::-webkit-scrollbar {
		display: none;
	}
`;
const Photo = styled.img`
	display: block;
	width: 60%;
	margin: 2rem auto 1rem auto;
	padding: 0 0.3rem;
`;

type PhotoPreviewType = {
	previewUrls: string[];
};

export default function PhotoPreview({ previewUrls }: PhotoPreviewType) {
	const [num, setNum] = useState(0);
	const increment = () => {
		setNum(num + 1);
	};
	const { files } = usePostContext();

	const handlePhotoClick = () => {
		if (files && files.length > 0) {
			const fileArray = Array.from(files);
		}
		increment();
	};

	return (
		<Container>
			{previewUrls.map((url, index) => (
				<Photo key={index} src={url} alt="dummy" onClick={handlePhotoClick} />
			))}
		</Container>
	);
}
