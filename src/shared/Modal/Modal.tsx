import { ReactNode } from 'react';
import styled from 'styled-components';

const ModalContainer = styled.div`
	position: fixed;
	left: 0;
	right: 0;
	top: 0;
	bottom: 0;
	align-items: center;
	justify-content: center;
	display: flex;
	z-index: 2;
	& h1 {
		margin: 0;
	}
	& p {
		margin: 0;
	}
	& > :not(.modal--backgroud) {
		animation: modal-content 0.5s;
	}
	&.closing :not(.modal--background) {
		animation: modal-content-closing 0.5s;
		opacity: 0;
		transform: translateY(-5rem);
	}
	& .modal--background {
		position: absolute;
		left: 0;
		right: 0;
		top: 0;
		bottom: 0;
		background: rgba(0, 0, 0, 0.5);
		z-index: -1;
		animation: modal-bg 0.5s;
	}
	&.closing > .modal--background {
		animation: modal-bg-closing 0.5s;
		opacity: 0;
	}
	@keyframes modal-content {
		from {
			transform: translateY(-5rem);
			opacity: 0;
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
