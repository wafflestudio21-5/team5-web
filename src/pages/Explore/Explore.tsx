import Preview from '../../components/Explore/Preview';
import SubjectBar from '../../components/Explore/SubjectBar';
import InstagramHeader from '../../shared/Header/InstagramHeader.tsx';

export default function Explore() {
	const subjects = [
		'게임',
		'여행',
		'음식',
		'스포츠',
		'동물',
		'일상',
		'패션',
		'유머',
		'예술',
		'뉴스',
	];
	return (
		<>
			<InstagramHeader isMainPage={false} />
			<SubjectBar />
			{subjects.map((subject) => (
				<Preview category={subject} />
			))}
		</>
	);
}
