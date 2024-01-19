import { ReactNode } from 'react';
import styled from 'styled-components';
import { useState } from 'react';
import Icon from '../../shared/Icon.tsx';
import { getColor } from '../../styles/Theme.tsx';

const ToggleBarLayout = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	width: 100%;
`;

const ToggleBarContainer = styled.div`
	display: flex;
	flex-direction: row;
	align-items: center;
	width: 100%;
	height: 100%;

	border-bottom: 1px solid ${getColor('lightGrey')};
`;

const ToggleButtonContainer = styled.div`
	display: flex;
	flex-direction: row;
	justify-content: center;
	align-items: center;
	width: 50%;
	height: 100%;
	font-size: 1rem;
	padding-bottom: 0.5rem;
	color: ${getColor('grey')};

	&.active {
		border-bottom: 1px solid ${getColor('black')};
		color: ${getColor('black')};
	}

	&:hover {
		cursor: pointer;
	}
`;

const ContentContainer = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	width: 100%;
	height: 100%;
`;

type props = {
	children: ReactNode[];
	leftTab: string | ReactNode;
	rightTab: string | ReactNode;
	activeTab: 'left' | 'right';
	setActiveTab: (tab: 'left' | 'right') => void;
};

export default function ToggleBar({
	children,
	leftTab,
	rightTab,
	activeTab,
	setActiveTab,
}: props) {
	return (
		<ToggleBarLayout>
			<ToggleBarContainer>
				<ToggleButtonContainer
					className={activeTab === 'left' ? 'active' : ''}
					onClick={() => setActiveTab('left')}
				>
					{leftTab}
				</ToggleButtonContainer>
				<ToggleButtonContainer
					className={activeTab === 'right' ? 'active' : ''}
					onClick={() => setActiveTab('right')}
				>
					{rightTab}
				</ToggleButtonContainer>
			</ToggleBarContainer>
			<ContentContainer>
				{activeTab === 'left' ? children[0] : children[1]}
			</ContentContainer>
		</ToggleBarLayout>
	);
}
