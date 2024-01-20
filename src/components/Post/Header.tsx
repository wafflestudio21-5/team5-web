import { useRef, useState } from 'react';
import styled from 'styled-components';

const Img = styled.img`
	&.logo {
		width: 8rem;
	}
	&.menu {
		width: 2.5rem;
		margin-top: 0.3rem;
	}
	&.dm {
		position: relative;
		width: 2rem;
		margin: 1rem auto;
	}
	&.heart {
		position: relative;
		width: 1.8rem;
		margin: 1rem auto;
	}
	&.icon {
		position: absolute;
		right: 1rem;
		width: 1.3rem;
		bottom: 0.6rem;
	}
`;
const Div = styled.div`
    &.headerBox {
        position: relative;
        width: 100%;
        height: 4rem; 
        margin: 0 auto;
        background-color: white;  
    }
    &.modalBox {
        position: absolute;
        z-index: 100;
        left: 5%;
        top : 5rem;
        width: 9rem;
        box-shadow: 0 0 3rem gainsboro;
        border-radius: 1rem;
        height: 5rem;
        t
    }
    &.line {
		width: 100%;
		border-bottom: 1px solid gainsboro;
	}
    &.background {
        position: absolute;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        background-color: transparent;
        z-index: 2;

    }
`;
const Button = styled.button`
	border: none;
	height: 4rem;
	background-color: white;
	&.logo {
		width: 9rem;
		float: left;
	}
	&.dm {
		position: absolute;
		right: 0rem;
		width: 3rem;
	}
	&.heart {
		position: absolute;
		right: 3.2rem;
		width: 3rem;
	}
	&.box {
		display: block;
		position: relative;
		border: none;
		width: 100%;
		height: 2.5rem;
		padding-left: 0.7rem;
		background-color: white;
		font-size: 0.9rem;
		text-align: left;
	}
	&#first {
		border-radius: 1rem 1rem 0 0;
	}
	&#second {
		border-radius: 0;
	}
	&#third {
		border-radius: 0 0 1rem 1rem;
	}
`;

export default function Header() {
	const [isModalOpen, setIsModalOpen] = useState(false);
	return (
		<>
			<Div className="headerBox">
				<Button className="logo" onClick={() => setIsModalOpen(true)}>
					<Img
						className="logo"
						src="https://1000logos.net/wp-content/uploads/2017/02/Logo-Instagram.png"
						alt="로고"
					/>
				</Button>
				<Button className="menu" onClick={() => setIsModalOpen(true)}>
					<Img
						className="menu"
						src="https://media.istockphoto.com/id/1266601096/ko/%EB%B2%A1%ED%84%B0/%EC%95%84%EB%9E%98-%ED%99%94%EC%82%B4%ED%91%9C-%EC%95%84%EC%9D%B4%EC%BD%98-%EA%B8%B0%ED%98%B8%EB%A5%BC-%EC%A4%84%EC%9D%B4%EA%B1%B0%EB%82%98-%EB%8B%A4%EC%9A%B4%EB%A1%9C%EB%93%9C%ED%95%98%EA%B1%B0%EB%82%98-%EC%95%84%EB%9E%98%EB%A1%9C-%EC%8A%A4%ED%81%AC%EB%A1%A4%ED%95%A9%EB%8B%88%EB%8B%A4.jpg?s=612x612&w=0&k=20&c=RUO0rvWK2g-J8ppvd6TfzTPwCn46WAv5rgW2gDkvVew="
						alt="로고"
					/>
				</Button>
				<Button className="dm">
					<Img
						className="dm"
						src="https://cdn-icons-png.flaticon.com/512/5694/5694443.png"
						alt="DM"
					/>
				</Button>
				<Button className="heart">
					<Img
						className="heart"
						src="https://cdn-icons-png.flaticon.com/512/25/25424.png"
						alt="하트"
					/>
				</Button>
			</Div>
			{isModalOpen && (
				<Modal isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} />
			)}
		</>
	);
}

function Modal(props: {
	isModalOpen: boolean;
	setIsModalOpen: (b: boolean) => void;
}) {
	const { isModalOpen, setIsModalOpen } = props;
	const modalBackground = useRef<HTMLDivElement>(null);

	return (
		<>
			{isModalOpen && (
				<Div
					className="background"
					ref={modalBackground}
					onClick={(e) => {
						if (e.target === modalBackground.current) {
							setIsModalOpen(false);
						}
					}}
				>
					<Div className="modalBox">
						<Button className="box" id="first">
							팔로잉
							<Img
								className="icon"
								src="https://icons.veryicon.com/png/o/miscellaneous/ios-icon-library/people-3-person.png"
								alt="follwing"
							/>
						</Button>
						<Div className="line"></Div>
						<Button className="box" id="third">
							즐겨찾기
							<Img
								className="icon"
								src="https://static.vecteezy.com/system/resources/previews/010/158/762/original/star-icon-sign-symbol-design-free-png.png"
								alt="star"
							/>
						</Button>
					</Div>
				</Div>
			)}
		</>
	);
}
