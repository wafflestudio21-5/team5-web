import styled from 'styled-components';
import { useState } from 'react';
import { usePostContext } from '../../contexts/PostContext';

type CheckBoxType = {
	$isselected: boolean;
	onClick: () => void;
};

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
	height: 65%;
`;
const ElementBox = styled.div`
	display: block;
	height: 10rem;
	margin: 2rem auto 1rem auto;
	padding: 0 0.3rem;
`;
const CheckBox = styled.div<CheckBoxType>`
	margin-bottom: 0.5rem;
	padding-bottom: 0.7rem;
	text-align: center;
	width: 1.5rem;
	height: 0.8rem;
	border: 1px solid ${({ $isselected }) => ($isselected ? 'skyblue' : 'gray')};
	border-radius: 50%;
	background-color: ${({ $isselected }) => ($isselected ? 'skyblue' : 'white')};
	color: white;
	font-weight: 600;
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
					<CheckBox
						$isselected={fileNum[index] > 0}
						onClick={() => handleClick(index)}
					>
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
