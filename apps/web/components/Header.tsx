import styled from '@emotion/styled';
import { media } from 'styles/utils';

const Root = styled.div`
	position: fixed;
	top: 0;
	left: 0;
	right: 0;
	height: 4.5rem;
	display: flex;
	align-items: center;
	z-index: 100;
	transition: background 400ms ease 0s;

	& nav {
		z-index: 1;
		flex: 1;
		width: 100%;
		height: 100%;
		max-width: 86.5rem;
		width: 100%;
		margin: 0 auto;
		display: flex;
		flex-direction: row;
		align-items: center;
		background: linear-gradient(to bottom, rgba(255, 255, 255, 1), rgba(255, 255, 255, 0) 4.5rem);

		padding-left: 1rem;
		padding-right: 1rem;

		${media('2xs')} {
			padding-left: 1.5rem;
			padding-right: 1.5rem;
		}

		${media('md')} {
			padding-left: 3rem;
			padding-right: 3rem;
		}
	}
`;

const Border = styled.div`
	position: absolute;
	bottom: 0;
	left: 0;
	right: 0;
	height: 1px;
	max-width: 86.5rem;
	width: 100%;
	margin: 0 auto;
	padding-left: 1rem;
	padding-right: 1rem;

	${media('2xs')} {
		padding-left: 1.5rem;
		padding-right: 1.5rem;
	}

	${media('md')} {
		padding-left: 3rem;
		padding-right: 3rem;
	}

	& > div {
		width: 100%;
		height: 100%;
		background-color: rgba(0, 0, 0, 0.06);
	}
`;

const Backdrop = styled.div`
	&::before, &::after {
		content: "";
		position: absolute;
		inset: -1px 0px -60%;
		pointer-events: none;
		user-select: none;
	}

	&::before {
		backdrop-filter: blur(20px) saturate(2);
		-webkit-mask-image: linear-gradient(to bottom, black 4.5rem, transparent);
		mask-image: linear-gradient(to bottom, black 4.5rem, transparent);
	}
`;

const Brand = styled.div`
	display: flex;
	align-items: center;
	gap: 1rem;

	& h2 {
		font-size: 1.25rem;
		line-height: 1.5rem;
		letter-spacing: -0.5px;
	}
`;

export const Header = () => {
	return (
		<Root>
			<Backdrop />
			<nav>
				<Brand>
					<svg width="44" height="24" viewBox="0 0 44 24" fill="none" xmlns="http://www.w3.org/2000/svg">
						<path fill-rule="evenodd" clip-rule="evenodd" d="M9.5989 7.13422L11.2034 4.39126C12.7932 1.67317 15.7227 0.000587695 18.8924 0H42.2592C43.031 0 43.5118 0.8371 43.1231 1.50376L41.5283 4.23846C39.9402 6.96184 37.0072 8.63912 33.8334 8.63912H10.4621C9.68975 8.63912 9.20895 7.80087 9.5989 7.13422ZM0.876918 22.4962L2.47167 19.7615C4.06036 17.0381 6.99341 15.3608 10.1672 15.3608H25.4143C26.1866 15.3608 26.6674 16.1991 26.2775 16.8657L24.673 19.6087C23.0832 22.3268 20.1531 24 16.9834 24H1.74076C0.969031 24 0.488153 23.1629 0.876918 22.4962Z" fill="#6958CA" />
					</svg>
					<h2>Fennel</h2>
				</Brand>
			</nav>
			<Border>
				<div />
			</Border>
		</Root>
	);
};