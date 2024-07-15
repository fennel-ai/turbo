import styled from '@emotion/styled';
import Link from 'next/link';
import { Container } from "../Container"
import { IconButton } from '../IconButton';
import TwitterIcon from '../../icons/twitter.svg';
import LinkedInIcon from '../../icons/linkedin.svg';
import GithubIcon from '../../icons/github.svg';
import Logo from '../../icons/logo.svg';
import { media } from 'styles/utils';
import {SubscribeToNewsletter} from './SubscribeToNewsletter';

const Root = styled.footer`
    background-color: ${({ theme }) => theme.surface};
    padding-top: 3rem;
    padding-bottom: 3rem;
    transform: translateZ(0);
    border-top: 1px solid ${({ theme }) => theme.border};

    & p {
        margin: 0;
        font-size: 0.875rem;
        line-height: 1rem;
    }

    ${media('sm')} {
        padding-top: 5rem;
        padding-bottom: 5rem;
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
    grid-template-columns: 1fr;
    row-gap: 1rem;
    border-top: 0.5px solid ${({ theme }) => theme.border};
    padding-top: 2rem;

    & > p {
        text-align: center;
        display: flex;
        align-items: center;
        justify-content: center;
        color: ${({ theme }) => theme.on};
        opacity: 0.5;
        order: 2;
    }

    ${media('xs')} {
        grid-template-columns: repeat(3, 1fr);
        order: 1;
        row-gap: 0;
        padding-top: 0;
        border: none;
    }
`;

const Brand = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;
    order: 0;

    & svg {
        width: 1.5rem;
        height: 1.5rem; 
    }

    & p {
        font-variation-settings: "wght" 700;
        letter-spacing: -0.1;
    }

    ${media('xs')} {
        justify-content: flex-start;
    }
`;

const Actions = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;
    order: 1;

    ${media('xs')} {
        order: 2;
        justify-content: flex-end;
    }
`;

const Content = styled.div`
    display: grid;
    grid-template-columns: 1fr;
    row-gap: 2.5rem;

    h4 {
        margin-top: 0;
        font-size: 1rem;
        line-height: 1rem;
        font-variation-settings: "wght" 700;
    }

    ${media('2xs')} {
        grid-template-columns: 1fr 1fr;
    }

    ${media('sm')} {
        grid-template-columns: repeat(12, 1fr);
        row-gap: 0;
    }
`;

const SubscribeCta = styled.div`
    grid-column: span 2;

    & > h4 {
        margin-bottom: 1rem;
    }

    & > p {
        margin-top: 0.25rem !important;
        font-size: 0.8125rem;
        line-height: 1rem;
        color: ${({ theme }) => theme.on};
        opacity: 0.64;
    }

    ${media('sm')} {
        grid-column: span 4;
    }
`

const Spacer = styled.div`
    display: none;
    ${media('sm')} {
        display: flex;
        grid-column: span 2;
    }
`;

const Menu = styled.div`
    grid-column: 1 / span 1;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    text-align: left;

    ${media('2xs')} {
        grid-column: span 1;
    }

    ${media('sm')} {
        grid-column: span 3;
        align-items: flex-end;
        text-align: right;
        min-height: 8.5rem;
    }

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
                        <SubscribeToNewsletter/>
                    </SubscribeCta>
                    <Spacer />
                    <Menu>
                        <h4>Resources</h4>
                        <ul>
                            <li>
                                <Link href="https://fennel.ai/docs">Documentation</Link>
                            </li>
                            <li>
                                <Link href="https://fennel.ai/blog">Blog</Link>
                            </li>
                        </ul>
                    </Menu>
                    <Menu>
                        <h4>Company</h4>
                        <ul>
                            <li>
                                <Link href="https://fennel.ai/company">About</Link>
                            </li>
                            <li>
                                <Link href="https://fennel.ai/get-a-demo">Request a Demo</Link>
                            </li>
                            <li>
                                <Link href="https://fennel.ai/careers">Careers</Link>
                            </li>
                            <li>
                                <Link href="https://fennel.ai/legal/subprocessors">Subprocessors</Link>
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
