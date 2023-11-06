import styled from '@emotion/styled';
import Link from 'next/link';
import { Container } from "../Container"
import { IconButton } from '../IconButton';
import { SubmittableInput } from '../Inputs';

import TwitterIcon from '../../icons/twitter.svg';
import LinkedInIcon from '../../icons/linkedin.svg';
import GithubIcon from '../../icons/github.svg';
import Logo from '../../icons/logo.svg';

const Root = styled.footer`
    background-color: ${({ theme }) => theme.surface};
    padding-top: 5rem;
    padding-bottom: 5rem;
    transform: translateZ(0);

    & p {
        margin: 0;
        font-size: 0.875rem;
        line-height: 1rem;
    }
`;

const Wrapper = styled(Container)`
    display: flex;
    flex-direction: column;
    align-items: stretch;
    gap: 2rem;
`;

const Credit = styled.div`
    display: grid;
    grid-template-columns: repeat(3, 1fr);

    & > p {
        text-align: center;
        display: flex;
        align-items: center;
        justify-content: center;
        color: ${({ theme }) => theme.on};
        opacity: 0.5;
    }
`;

const Brand = styled.div`
    display: flex;
    align-items: center;
    gap: 0.5rem;

    & svg {
        width: 1.5rem;
        height: 1.5rem; 
    }

    & p {
        font-variation-settings: "wght" 700;
        letter-spacing: -0.1;
    }
`;

const Actions = styled.div`
    display: flex;
    align-items: center;
    justify-content: flex-end;
    gap: 0.5rem;
`;

const Content = styled.div`
    display: grid;
    grid-template-columns: repeat(12, 1fr);

    h4 {
        margin: 0;
        font-size: 1rem;
        line-height: 1rem;
        font-variation-settings: "wght" 700;
    }
`;

const SubscribeCta = styled.div`
    grid-column: span 4;
    & > h4 {
        margin-bottom: 0.5rem;
    }

    & > p {
        margin-top: 0.25rem;
        font-size: 0.8125rem;
        line-height: 1rem;
        color: ${({ theme }) => theme.on};
        opacity: 0.64;
    }
`

const Spacer = styled.div`
    grid-column: span 2;
`;

const Menu = styled.div`
    grid-column: span 3;
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    text-align: right;
    min-height: 8.5rem;

    h4 {
        margin-bottom: 1rem;
    }

    ul {
        list-style: none;
        margin: 0;
        padding: 0;
        display: flex;
        flex-direction: column;
        gap: 0.75rem;

        li {
            opacity: 0.5;
            cursor: pointer;
            
            a {
                color: ${({ theme }) => theme.on};
            }

            &:hover {
                opacity: 1;
            }
        }
    }
`;

export const Footer = () => {
    return (
        <Root>
            <Wrapper>
                <Content>
                    <SubscribeCta>
                        <h4>Subscribe for updates:</h4>
                        <SubmittableInput placeholder="Enter your email" size="small" />
                        <p>You can always unsubscribe at any time.</p>
                    </SubscribeCta>
                    <Spacer />
                    <Menu>
                        <h4>Resources</h4>
                        <ul>
                            <li>
                                <Link href="/docs">Documentation</Link>
                            </li>
                            <li>
                                <Link href="/blog">Blog</Link>
                            </li>
                        </ul>
                    </Menu>
                    <Menu>
                        <h4>Company</h4>
                        <ul>
                            <li>
                                <Link href="/company">About</Link>
                            </li>
                            <li>
                                <Link href="/request-a-demo">Request a Demo</Link>
                            </li>
                            <li>
                                <Link href="/careers">Careers</Link>
                            </li>
                        </ul>
                    </Menu>
                </Content>
                <Credit>
                   <Brand>
                        <Logo />
                        <p>Fennel</p>
                    </Brand> 
                    <p>
                        © {new Date().getFullYear()} Fennel
                    </p>
                    <Actions>
                        <IconButton icon={TwitterIcon} />
                        <IconButton icon={LinkedInIcon} />
                        <IconButton icon={GithubIcon} />
                    </Actions>
                </Credit>
            </Wrapper>
        </Root>
    )
}
