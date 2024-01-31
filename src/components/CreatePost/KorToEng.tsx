export default function KorToEng(category: string) {
	if (category === '게임') return 'GAME';
	else if (category === '여행') return 'TRAVEL';
	else if (category === '음식') return 'FOOD';
	else if (category === '스포츠') return 'SPORT';
	else if (category === '동물') return 'ANIMAL';
	else if (category === '일상') return 'LIFE';
	else if (category === '패션') return 'FASHION';
	else if (category === '유머') return 'HUMOR';
	else if (category === '예술') return 'ART';
	else if (category === '뉴스') return 'NEWS';
	else return null;
}
