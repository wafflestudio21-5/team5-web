import { DefaultTheme } from 'styled-components';

const Theme: DefaultTheme = {
	colors: {
		black: '#000000',
		white: '#FFFFFF',
		darkGrey: '#616161',
		grey: '#8E8E8E',
		lightGrey: '#c7c7c7',
		extraLightGrey: '#f0f1f0',
		blue: '#0095f6',
		darkBlue: '#00376b',
		red: '#ED4956',
		pinkRed: '#DB5465',
	},
};

export const getColor =
	(colorKey: keyof DefaultTheme['colors']) =>
	({ theme }: { theme: DefaultTheme }) =>
		theme.colors[colorKey];

export default Theme;
