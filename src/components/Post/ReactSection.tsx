import { useState } from 'react'
import styled from 'styled-components'
import Icon from '../../shared/Icon'
import likedIcon from '../../assets/Images/Post/liked.svg'
import likeIcon from '../../assets/Images/Post/like.svg'
import commentIcon from '../../assets/Images/Post/comment.svg'
import shareIcon from '../../assets/Images/Post/share.svg'
import saveIcon from '../../assets/Images/Post/save.svg'

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
		cursor: pointer;
	}
	& .icon-box:hover {
		opacity: 0.3;
	}
	& .icon-box:first-child {
		margin-left: -0.5rem;
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
	&.more-comment {
		cursor: pointer;
	}
	& .like-num {
		font-weight: 600;
		cursor: pointer;
	}
	& .username {
		font-weight: 700;
		cursor: pointer;
	}
	& .username:hover {
		color: gray;
	}
`

type Props = {
	postId: number | null
}

export default function ReactSection({ postId }: Props) {
	const [liked, setLiked] = useState(false)

	return (
		postId && (
			<Container>
				<IconBar>
					<div className="like-comment-share">
						<div
							className="icon-box"
							onClick={() => {
								if (liked) {
									fetch(`/api/v1/posts/${postId}/likes`, {
										method: 'POST',
									})
								} else {
									fetch(`/api/v1/posts/${postId}/likes`, {
										method: 'DELETE',
									})
								}
								setLiked(!liked)
							}}
						>
							{liked ? (
								<Icon src={likedIcon} alt="좋아요 취소" />
							) : (
								<Icon src={likeIcon} alt="좋아요" />
							)}
						</div>
						<div className="icon-box">
							<Icon src={commentIcon} />
						</div>
						<div className="icon-box">
							<Icon src={shareIcon} />
						</div>
					</div>
					<div className="save">
						<div className="icon-box">
							<Icon src={saveIcon} />
						</div>
					</div>
				</IconBar>
				<TextBox>
					<span className="like-num">좋아요 527개</span>
				</TextBox>
				<TextBox className="margin">
					<span className="username">sangchu</span> 가나다라마바사
				</TextBox>
				<TextBox className="margin secondary-text more-comment">
					댓글 3개 모두 보기
				</TextBox>
			</Container>
		)
	)
}
