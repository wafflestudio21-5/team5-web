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
	height: 100%;
`;
const ElementBox = styled.div`
	display: block;
	height: 9rem;
	margin: 2rem auto 1rem auto;
	padding: 0 0.3rem;
`;

type PhotoPreviewType = {
	previewUrls: string[];
};

export default function PhotoPreviewInorder({ previewUrls }: PhotoPreviewType) {
	const { fileOrder } = usePostContext();

	return (
		<Container>
			{fileOrder.map((num, index) => (
				<ElementBox>
					<Photo key={index} src={previewUrls[num]} alt="dummy" />
				</ElementBox>
			))}
		</Container>
	);
}
