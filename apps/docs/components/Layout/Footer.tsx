import styled from '@emotion/styled';
import { media } from 'styles/utils';
import { IconButton } from 'ui';
import TwitterIcon from 'ui/icons/twitter.svg';
import LinkedInIcon from 'ui/icons/linkedin.svg';
import GitHubIcon from 'ui/icons/github.svg';
import Logo from 'ui/icons/logo.svg';

import Container from 'components/Container';

const Root = styled.footer`
	border-top: 1px solid ${({ theme }) => theme.border};

	${media('xs')} {
		height: 6.5rem;
	}
`;

const Wrapper = styled(Container)`
	display: flex;
	align-items: center;
	justify-content: space-between;
	flex-direction: column;
	height: 100%;
	padding-bottom: 2rem;

	${media('xs')} {
		flex-direction: row;
		padding-bottom: 0rem;	
	}
`;

const Brand = styled.div`
	display: flex;
	align-items: center;
	gap: 1rem;
	color: ${({ theme }) => theme.on_alt};

	& h4 {
		font-size: 1.25rem;
		line-height: 1.5rem;
		font-variation-settings: "wght" ${({ theme }) => theme.fontWeights.primary.bold};
	}

	& p {
		font-size: 0.875rem;
		line-height: 1.5rem;
		font-variation-settings: "wght" ${({ theme }) => theme.fontWeights.primary.semibold};
		letter-spacing: -1px;
		opacity: 64%;
	}
`;

const Socials = styled.div`
	display: flex;
	align-items: center;
	gap: 0.5rem;
	
	a {
		color: ${({ theme }) => theme.on_alt};
	}
`;

const Footer = () => {
	return (
		<Root>
			<Wrapper>
				<Brand>
					<Logo width={44} height={24} />
					<h4>Fennel</h4>
					<p>© 2023</p>
				</Brand>
				<Socials>
					<a href="https://www.twitter.com/fennelai/" aria-label="twitter" target="_blank" rel="noreferrer">
						<IconButton ariaLabel="Twitter" icon={TwitterIcon} />
					</a>
					<a href="https://www.linkedin.com/company/fennel-ai/" aria-label="linkedin" target="_blank" rel="noreferrer">
						<IconButton ariaLabel="LinkedIn" icon={LinkedInIcon} />
					</a>
					<a href="https://github.com/fennel-ai" aria-label="github" target="_blank" rel="noreferrer">
						<IconButton ariaLabel="Github" icon={GitHubIcon} />
					</a>
				</Socials>
			</Wrapper>
		</Root>
	);
};

export default Footer;