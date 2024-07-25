import styled from '@emotion/styled';
import localFont from '@next/font/local';

export const haskoyVariable = localFont({
	src: [{
		path: "./fonts/haskoy.woff2"
	}],
	preload: true
});


export const Paragraph = styled.p`
    margin: 0;
    ${({ theme}) => theme.body.default};
    font-family: ${haskoyVariable.style.fontFamily}, sans-serif;
`;