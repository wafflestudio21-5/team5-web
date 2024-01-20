import { ReactNode } from 'react';
import styled from 'styled-components';

import { getColor } from '../styles/Theme.tsx';

const ModalContainer = styled.div`
	display: flex;
	align-items: center;
	justify-content: center;
	z-index: 100;

	position: fixed;
	left: 0;
	right: 0;
	top: 0;
	bottom: 0;

	// 모달 버튼 글꼴
	& p {
		font-size: 1.2rem;
		margin: 0;
	}

	// 아이콘 margin
	& img {
		margin: 1rem;
	}

	// width 100% 짜리 구분선
	& hr {
		width: 100%;
		margin: 0;
		border: none;
		border-top: 0.5px solid ${getColor('lightGrey')};
	}

	// 아이콘 위치 제외한 구분선
	& hr.content {
		width: 83%;
		margin: 0 0 0 3.5rem;
		border: none;
		border-top: 0.5px solid ${getColor('lightGrey')};
	}

	// 모달 컴포넌트 css
	& > :not(.modal--background) {
		animation: modal-content 0.3s;
		max-width: 430px;
		width: 100%;

		// 모달 화면 하단 중앙 위치
		position: fixed;
		left: 0;
		right: 0;
		bottom: 0;
		margin: auto;

		display: flex;
		flex-direction: column;
		align-items: center;

		background-color: white;
		border-top-left-radius: 1rem;
		border-top-right-radius: 1rem;
	}

	&.closing :not(.modal--background) {
		animation: modal-content-closing 0.3s; // Modal 관련 setTimeOut 300ms로 설정하기
		opacity: 0;
		transform: translateY(30rem);
	}

	& .modal--background {
		position: absolute;
		left: 0;
		right: 0;
		top: 0;
		bottom: 0;
		background: rgba(0, 0, 0, 0.5);
		z-index: -1;
		animation: modal-bg 0.3s;
	}

	&.closing > .modal--background {
		animation: modal-bg-closing 0.3s;
		opacity: 0;
	}

	@keyframes modal-content {
		from {
			transform: translateY(30rem);
		}
		to {
		}
	}

	@keyframes modal-content-closing {
		from {
			transform: none;
			opacity: 1;
		}
		to {
		}
	}

	@keyframes modal-bg {
		from {
			opacity: 0;
		}
		to {
		}
	}

	@keyframes modal-bg-closing {
		from {
			opacity: 1;
		}
		to {
		}
	}
`;

type Props = {
	children: ReactNode;
	onBackgroundClick: () => void;
	isClosing: boolean;
};

export default function Modal({
	children,
	onBackgroundClick,
	isClosing,
}: Props) {
	return (
		<ModalContainer className={isClosing ? ' closing' : ''}>
			<div className="modal--background" onClick={() => onBackgroundClick()} />
			{children}
		</ModalContainer>
	);
}
