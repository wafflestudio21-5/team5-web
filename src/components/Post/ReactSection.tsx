import styled from 'styled-components'

const Container = styled.div`
	display: flex;
	flex-direction: column;
	width: 100%;
	height: fit-content;
`

const IconBar = styled.div`
	display: grid;
	align-items: center;
	grid-template-columns: 1fr 1fr;
	margin-top: 0.25rem;
	margin-bottom: 0.25rem;
	& > .like-comment-share {
		display: flex;
		flex-direction: row;
		justify-content: flex-start;
	}
	& .icon-box {
		padding: 0.5rem;
	}
	& svg {
		height: 1.5rem;
		width: 1.5rem;
	}
	& > .save {
		margin-left: auto;
		margin-right: 0;
	}
`

const TextBox = styled.div`
	line-height: 18px;
	font-size: 14px;
	&.margin {
		margin-top: 0.5rem;
	}
	&.secondary-text {
		color: rgb(125, 125, 125);
	}
	& .like-num {
		font-weight: 600;
	}
	& .username {
		font-weight: 700;
	}
`

export default function ReactSection({ postId }: { postId: number }) {
	return (
		<Container>
			<IconBar>
				<div className="like-comment-share">
					<div
						className="icon-box"
						onClick={() => {
							fetch(`/api/v1/posts/${postId}/likes`, {
								method: 'POST',
							})
						}}
					>
						<svg
							aria-label="좋아요"
							fill="currentColor"
							role="img"
							viewBox="0 0 24 24"
						>
							<title>좋아요</title>
							<path d="M16.792 3.904A4.989 4.989 0 0 1 21.5 9.122c0 3.072-2.652 4.959-5.197 7.222-2.512 2.243-3.865 3.469-4.303 3.752-.477-.309-2.143-1.823-4.303-3.752C5.141 14.072 2.5 12.167 2.5 9.122a4.989 4.989 0 0 1 4.708-5.218 4.21 4.21 0 0 1 3.675 1.941c.84 1.175.98 1.763 1.12 1.763s.278-.588 1.11-1.766a4.17 4.17 0 0 1 3.679-1.938m0-2a6.04 6.04 0 0 0-4.797 2.127 6.052 6.052 0 0 0-4.787-2.127A6.985 6.985 0 0 0 .5 9.122c0 3.61 2.55 5.827 5.015 7.97.283.246.569.494.853.747l1.027.918a44.998 44.998 0 0 0 3.518 3.018 2 2 0 0 0 2.174 0 45.263 45.263 0 0 0 3.626-3.115l.922-.824c.293-.26.59-.519.885-.774 2.334-2.025 4.98-4.32 4.98-7.94a6.985 6.985 0 0 0-6.708-7.218Z"></path>
						</svg>
					</div>
					<div className="icon-box">
						<svg
							aria-label="댓글 달기"
							fill="currentColor"
							role="img"
							viewBox="0 0 24 24"
						>
							<title>댓글 달기</title>
							<path
								d="M20.656 17.008a9.993 9.993 0 1 0-3.59 3.615L22 22Z"
								fill="none"
								stroke="currentColor"
								stroke-linejoin="round"
								stroke-width="2"
							></path>
						</svg>
					</div>
					<div className="icon-box">
						<svg
							aria-label="게시물 공유"
							fill="currentColor"
							role="img"
							viewBox="0 0 24 24"
						>
							<title>게시물 공유</title>
							<line
								fill="none"
								stroke="currentColor"
								stroke-linejoin="round"
								stroke-width="2"
								x1="22"
								x2="9.218"
								y1="3"
								y2="10.083"
							></line>
							<polygon
								fill="none"
								points="11.698 20.334 22 3.001 2 3.001 9.218 10.084 11.698 20.334"
								stroke="currentColor"
								stroke-linejoin="round"
								stroke-width="2"
							></polygon>
						</svg>
					</div>
				</div>
				<div className="save">
					<div className="icon-box">
						<svg
							aria-label="저장"
							fill="currentColor"
							role="img"
							viewBox="0 0 24 24"
						>
							<title>저장</title>
							<polygon
								fill="none"
								points="20 21 12 13.44 4 21 4 3 20 3 20 21"
								stroke="currentColor"
								stroke-linecap="round"
								stroke-linejoin="round"
								stroke-width="2"
							></polygon>
						</svg>
					</div>
				</div>
			</IconBar>
			<TextBox>
				<span className="like-num">좋아요 527개</span>
			</TextBox>
			<TextBox className="margin">
				<span className="username">sangchu</span> 가나다라마바사
			</TextBox>
			<TextBox className="margin secondary-text">댓글 3개 모두 보기</TextBox>
			<TextBox className="margin secondary-text">댓글 달기...</TextBox>
		</Container>
	)
}
