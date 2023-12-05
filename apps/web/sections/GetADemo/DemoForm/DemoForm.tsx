import { Container } from 'ui';
import { media, rgba } from 'styles/utils';
import Image from 'next/image';
import { useRouter } from 'next/router';
import styled from "@emotion/styled";
import RequestDemoForm from 'components/RequestDemoForm';

const Root = styled.div`
	position : relative;
	background-color: ${({ theme }) => theme.background};
	color: ${({ theme }) => theme.on};
	padding: 5rem 0;
	z-index: 0;
	overflow: hidden;

	&::before {
		content: "";
		position: absolute;
		inset: 80% 0 0 0;
		z-index: 0;
		opacity: 0.64;
		background: conic-gradient(from 248deg at 51.63% 52.16%, rgba(12, 66, 167, 1) 0deg, rgb(0, 135, 255) 60deg, rgba(91, 68, 222, 1) 200deg, rgba(12, 23, 50, 1) 240deg, rgba(141, 185, 242, 1) 296deg, rgba(91, 68, 222, 1) 360deg);
		filter: blur(160px);
	}
`;

const Wrapper = styled(Container)`
	display: grid;
	grid-template-columns: repeat(12, 1fr);
	column-gap: 2rem;
`;

const FormCard = styled.div`
	grid-column: span 12;
	align-self: center;
	position: relative;
	padding: 3rem;
	border-radius: 1.5rem;
	background-color: ${({ theme }) => rgba(theme.surface, 0.7)};
	overflow: hidden;

	${media('sm')} {
		grid-column: 3 / span 8;
	}

	${media('md')} {
		grid-column: span 5;
	}

	&:before {
		content: "";
		position: absolute;
		inset: 1px;
		background-color: ${({ theme }) => rgba(theme.background, 0.7)};
		border-radius: calc(1.5rem - 1px);
		z-index: 0;
	}

	h3 {
		position: relative;
		text-align: center;
		font-size: 2rem;
		line-height: 2rem;
		color: ${({ theme }) => theme.on};
		margin: 0;
		margin-bottom: 2rem;
		z-index: 2;
	}

	label {
		color: ${({ theme }) => theme.on_alt};
	}

	input, select {
		border-color: ${({ theme }) => theme.border.light} !important;
		color: ${({ theme }) => theme.on};

		&::placeholder {
			color: ${({ theme }) => rgba(theme.on_alt, 0.4)};
		}
	}

	select {
		cursor: pointer;
	}
`;

const Logos = styled.div`
	display: none;
	grid-column: 7 / span 6;
	text-align: center;
	color: ${({ theme }) => theme.on_alt};
	padding: 5rem 0;
	gap: 2.5rem;
	
	${media('md')} {
		display: flex;
		flex-direction: column;
		align-items: stretch;
	}

	& p {
		margin: 0;
	}
`;

const LogoRow = styled.div`
	display: flex;
	align-items: center;
	gap: 2rem;

	& > span {
		display: flex;
		align-items: center;
		justify-content: center;
		flex: 1 1 auto;

		& img {
			width: 100%;
		}
	}
`;

export default function DemoForm() {
	const router = useRouter();
	return (
		<Root>
			<Wrapper>
				<FormCard>
					<h3>Get a demo</h3>
					<RequestDemoForm onSubmit={() => router.push("/demo-request-confirmation-page")} />
				</FormCard>
				<Logos>
					<p>Backed by Top VCs and Unicorn Founders</p>
					<LogoRow>
						<span>
							<Image src="/images/foundation-dark.svg" alt="Foundation Capital Logo" width={152} height={48} />
						</span>
						<span>
							<Image src="/images/scribble-dark.svg" alt="Scribble Ventures Logo" width={136} height={48} />
						</span>
						<span>
							<Image src="/images/essence-dark.svg" alt="Essence Logo" width={152} height={28} />
						</span>
					</LogoRow>
					<LogoRow>
						<span>
							<Image src="/images/confluent.svg" alt="Confluent Logo" width={165} height={32} />
						</span>
						<span>
							<Image src="/images/quora.svg" alt="Quora Logo" width={144} height={40} />
						</span>
					</LogoRow>
				</Logos>
			</Wrapper>
		</Root>
	);
}