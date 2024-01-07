import { createGlobalStyle } from 'styled-components'

const GlobalStyles = createGlobalStyle`
	body {
		// modal을 제외한 component에서는 width: 100%일 경우 자동으로 430px, 모달은 크기 직접 설정하기
		max-width: 430px; // Iphone 14 pro max width
			
		// 중앙 정렬
		margin: 0 auto;
			
		// 맨위에 1rem 여백 들어가므로 맨 위에 있는 component는 margin-top: 0; 지키기
		padding-top: 1rem;
			
		box-sizing: border-box;
		font-family: 'Noto Sans KR', sans-serif;
	}
`

export default GlobalStyles
