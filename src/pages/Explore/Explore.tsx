import { feed } from '../../components/Feed';
import PostList from '../../components/Post/PostList';

export default function Explore() {
	return (
		<>
			<div>포스트 필터링 탭 추가 예정</div>
			<PostList posts={feed.posts} />
		</>
	);
}
