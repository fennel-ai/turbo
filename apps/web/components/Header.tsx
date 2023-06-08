import styled from '@emotion/styled';
import { media } from 'styles/utils';
import Logo from 'ui/icons/logo.svg';

const Root = styled.div`
	position: fixed;
	top: 0;
	left: 0;
	right: 0;
	height: 3rem;
	display: flex;
	align-items: center;
	z-index: 100;
	transition: background 400ms ease 0s;

	background: linear-gradient(to bottom, rgba(255, 255, 255, 1), rgba(255, 255, 255, 0) 4.5rem);

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
		// background: linear-gradient(to bottom, rgba(255, 255, 255, 1), rgba(255, 255, 255, 0) 4.5rem);

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

	${media('md')} {
		height: 4.5rem;
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
		-webkit-mask-image: linear-gradient(to bottom, black 3rem, transparent);
		mask-image: linear-gradient(to bottom, black 3rem, transparent);

		${media('md')} {
			-webkit-mask-image: linear-gradient(to bottom, black 4.5rem, transparent);
			mask-image: linear-gradient(to bottom, black 4.5rem, transparent);
		}
	}
`;

const Brand = styled.div`
	display: flex;
	align-items: center;
	gap: 0.5rem;

	${media('md')} {
		gap: 1rem;
	}

	& svg {
		color: #6958CA;
		width: 28px;
		height: 28px;

		${media('md')} {
			width: 40px;
			height: 40px;
		}
	}

	& h2 {
		font-size: 1rem;
		line-height: 1.5rem;
		letter-spacing: -0.5px;

		${media('md')} {
			font-size: 1.25rem;
			line-height: 1.5rem;
		}
	}
`;

export const Header = () => {
	return (
		<Root>
			<Backdrop />
			<nav>
				<Brand>
					<Logo />
					<h2>Fennel</h2>
				</Brand>
			</nav>
			<Border>
				<div />
			</Border>
		</Root>
	);
};