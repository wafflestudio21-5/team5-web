import styled from 'styled-components';
import { useState } from 'react';
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
	width: 100%;
`;
const ElementBox = styled.div`
	display: block;
	width: 60%;
	margin: 2rem auto 1rem auto;
	padding: 0 0.3rem;
`;
const CheckBox = styled.div`
	margin-bottom: 0.5rem;
	padding-bottom: 0.7rem;
	text-align: center;
	width: 1.5rem;
	height: 0.8rem;
	border: 1px solid black;
	border-radius: 50%;
	background-color: white;
	color: black;
`;

type PhotoPreviewType = {
	previewUrls: string[];
};

export default function PhotoPreview({ previewUrls }: PhotoPreviewType) {
	const [num, setNum] = useState(1);
	const { fileOrder, setFileOrder, fileNum, setFileNum } = usePostContext();
	const increment = () => {
		if (num < previewUrls.length) setNum(num + 1);
	};
	const handleClick = (index: number) => {
		console.log(fileOrder);
		increment();
		if (fileNum[index] >= 0) return;
		setFileOrder([...fileOrder, index]);
		const newArray = [...fileNum];
		newArray[index] = num;
		setFileNum(newArray);
	};

	return (
		<Container>
			{previewUrls.map((url, index) => (
				<ElementBox>
					<CheckBox onClick={() => handleClick(index)}>
						{fileNum[index]}
					</CheckBox>
					<Photo
						key={index}
						src={url}
						alt="dummy"
						onClick={() => handleClick(index)}
					/>
				</ElementBox>
			))}
		</Container>
	);
}
