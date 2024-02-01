import styled from 'styled-components';

const Container = styled.div`
	width: 100%;
	border-bottom: 1px solid gainsboro;
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
	return (
		<Container>
			{previewUrls.map((url, index) => (
				<Photo key={index} src={url} alt="dummy" />
			))}
		</Container>
	);
}
