import { DefaultTheme } from 'styled-components'

const Theme: DefaultTheme = {
	colors: {
		black: '#000000',
		white: '#FFFFFF',
		darkGrey: '#262626',
		grey: '#8E8E8E',
		lightGrey: '#FAFAFA',
		blue: '#0095f6',
	},
}

export const getColor =
	(colorKey: keyof DefaultTheme['colors']) =>
	({ theme }: { theme: DefaultTheme }) =>
		theme.colors[colorKey]

export default Theme
