import type { Theme as CustomTheme } from 'styles';

declare module "@emotion/react" {
	export interface Theme extends CustomTheme { }
}

declare module '*.svg' {
	import * as React from 'react'

	export const ReactComponent: React.FunctionComponent<
		React.ComponentProps<'svg'> & { title?: string }
	>
}