import styled from 'styled-components';

import likeIcon from '../../assets/Images/Post/like.svg';
import Icon from '../../shared/Icon';
import { getColor } from '../../styles/Theme';
import { CommentType } from '../../types';

type CommentProps = {
	comment: CommentType;
};

const CommentContainer = styled.div`
	display: flex;
	flex-direction: row;
	align-items: flex-start;
	& > .profile {
		border-radius: 70%;
		overflow: hidden;
		display: inline;
		border: 1px solid ${getColor('grey')};
	}
	& > .profile > img {
		width: 100%;
		height: 100%;
		object-fit: cover;
	}
`;

export default function Comment({ comment }: CommentProps) {
	return (
		<CommentContainer>
			<div className="profile">
				<img
					src={
						comment.userImage ??
						'https://wafflestudio.com/static/images/DefaultProfileImage.svg'
					}
					alt="프로필 이미지"
				/>
			</div>
			<div>
				<span>{comment.username}</span>
				{comment.content}
			</div>
			<div>
				<Icon src={likeIcon} />
			</div>
		</CommentContainer>
	);
}
