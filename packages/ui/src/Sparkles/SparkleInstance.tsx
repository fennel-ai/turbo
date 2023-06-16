import { keyframes } from '@emotion/react';
import styled from '@emotion/styled';
import { HTMLAttributes } from 'react';

type Props = {
	color: string;
	size: number;
	style: HTMLAttributes<SVGElement>['style']
}

export const SparkleInstance = ({ color, size, style }: Props) => {
	const path =
		'M12.9701 1.75746C12.8588 1.3123 12.4589 1 12 1C11.5411 1 11.1411 1.3123 11.0299 1.75746L9.72836 6.96345C9.45736 8.04747 9.36609 8.36137 9.21077 8.6041C9.05481 8.84783 8.84783 9.05481 8.6041 9.21077C8.36137 9.36609 8.04747 9.45736 6.96346 9.72836L1.75746 11.0299C1.3123 11.1411 1 11.5411 1 12C1 12.4589 1.3123 12.8589 1.75746 12.9701L6.96345 14.2716C8.04747 14.5426 8.36137 14.6339 8.6041 14.7892C8.84783 14.9452 9.05481 15.1522 9.21077 15.3959C9.36609 15.6386 9.45736 15.9525 9.72836 17.0365L11.0299 22.2425C11.1412 22.6877 11.5411 23 12 23C12.4589 23 12.8589 22.6877 12.9701 22.2425L14.2716 17.0365C14.5426 15.9525 14.6339 15.6386 14.7892 15.3959C14.9452 15.1522 15.1522 14.9452 15.3959 14.7892C15.6386 14.6339 15.9525 14.5426 17.0365 14.2716L22.2425 12.9701C22.6877 12.8589 23 12.4589 23 12C23 11.5411 22.6877 11.1411 22.2425 11.0299L17.0365 9.72836C15.9525 9.45736 15.6386 9.36609 15.3959 9.21077C15.1522 9.05481 14.9452 8.84783 14.7892 8.6041C14.6339 8.36137 14.5426 8.04747 14.2716 6.96346L12.9701 1.75746Z';
	
	return (
		<Wrapper style={style}>
			<Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
				<path d={path} fill={color} />
			</Svg>
		</Wrapper>
	);
}

const growAndShrink = keyframes`
  0% {
    transform: scale(0);
  }
  50% {
    transform: scale(1);
  }
  100% {
    transform: scale(0);
  }
`;

const spin = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(180deg);
  }
`;

const Wrapper = styled.div`
	position: absolute;
	pointer-events: none;
	display: block;

	@media (prefers-reduced-motion: no-preference) {
		animation: ${growAndShrink} 1000ms ease-in-out forwards;
	}
`;

const Svg = styled.svg`
	display: block;
	
	@media (prefers-reduced-motion: no-preference) {
		animation: ${spin} 1300ms linear;
	}
`;