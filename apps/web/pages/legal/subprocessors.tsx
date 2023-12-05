import Head from "next/head";
import styled from '@emotion/styled';


import { Hero } from "sections/Subprocessors";
import { Container } from "ui";
import { media } from "styles/utils";

type Subprocessor = {
    name: string;
    url: string;
    description: string;
    location: string;
}

const SUBPROCESSORS: Subprocessor[] = [
    {
        name: 'Amazon Web Services',
        url: "aws.amazon.com",
        description: "Cloud infrastructure Services",
        location: "United States"
    },
    {
        name: 'Google Cloud Platform',
        url: "cloud.google.com",
        description: "Cloud infrastructure Services",
        location: "United States"
    },
    {
        name: 'Linear',
        url: "linear.app",
        description: "Ticket Tracking and Work Management Tool",
        location: "United States"
    },
    {
        name: 'Slack',
        url: "slack.com",
        description: "Alerting and Support Offerings",
        location: "United States"
    },
    {
        name: 'Vercel',
        url: "vercel.com",
        description: "Web Hosting Provider",
        location: "United States"
    },
    {
        name: 'Code',
        url: "coda.io",
        description: "Internal Collaboration, Documentation & Wiki",
        location: "United States"
    },
]

const Wrapper = styled(Container)`
    padding-top: 2.5rem;
    padding-bottom: 5rem;
`;

const ListHeader = styled.div`
    display: grid;
    grid-template-columns: 1fr 2fr 1fr;
    border-bottom: 1px solid ${({ theme }) => theme.border.light};
    font-size: 0.8125rem;
    line-height: 1rem;
    font-variation-settings: "wght" 600;

    ${media('sm', 'max')} {
        display: none;
    }
`;

const SubprocessorItem = styled.div`
    display: flex;
    flex-direction: column;

    & p {
        margin: 0;
    }

    ${media('sm', 'max')} {
        background-color: ${({ theme }) => theme.glass};
        gap: 0.5rem;
        padding: 1rem;
        border: 1px solid ${({ theme }) => theme.border.light};
        border-radius: 0.5rem;

        & + & {
            margin-top: 1rem;
        }

        & > p {
            font-size: 0.875rem;
            line-height: 1rem;
            opacity: 0.6;
        }
    }
    
    ${media('sm')} {
        display: grid;
        grid-template-columns: 1fr 2fr 1fr;
        min-height: 5rem;
        align-items: center;

        & + & {
            border-top: 1px solid ${({ theme }) => theme.border.light};
        }
    }
`;

const SubprocessorName = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 0.25rem;

    ${media('sm', 'max')} {
        margin-bottom: 0.5rem;
    }

    & > p {
        font-size: 1rem;
        line-height: 1.5rem;
        opacity: 1;
    }

    & a {
        font-size: 0.875rem;
        line-height: 1rem;
        position: relative;
        text-decoration: none;
        color: ${({ theme }) => theme.on_alt};
        opacity: 0.8;
        transition: 160ms opacity ease-out;

        &::after {
            content: '';
            position: absolute;
            bottom: -1px;
            left: 0;
            right: 0;
            height: 1px;
            background-color: ${({ theme }) => theme.on};
            opacity: 0.4;
            transition: 80ms opacity ease-out;
            z-index: -1;
        }

        &:hover {
            opacity: 1;

            &::after {
                opacity: 0.64;
            }
        }
    }
`;

export default function Company() {
	return (
		<>
			<Head>
                <title>Subprocessors | Fennel</title>
				<meta name="description" content="Fennel is on a mission to enable companies and teams of any size to harness realtime machine learning to build delightful products for their customers." />
				<link rel="canonical" href="https://fennel.ai/legal/subprocessors" />

                <meta property="og:title" content="Subprocessors | Fennel" />
				<meta property="og:description" content="Fennel is on a mission to enable companies and teams of any size to harness realtime machine learning to build delightful products for their customers." />
				<meta property="og:url" content="https://fennel.ai/legal/subprocessors" />
				<meta property="og:image" content="https://fennel.ai/images/og/default.jpg" />
				<meta property="og:type" content="website" />
				<meta property="og:locale" content="en_US" />

				{/** Twitter will inherit the OG title and description */}
				<meta name="twitter:card" content="summary_large_image" />
				<meta name="twitter:site" content="@fennelAI" />
				<meta name="twitter:image" content="https://fennel.ai/images/og/default.jpg" />
			</Head>
			<main>
				<Hero />
                <Wrapper>
                    <ListHeader>
                        <p>Name</p>
                        <p>Description</p>
                        <p>Location</p>
                    </ListHeader>
                    {
                        SUBPROCESSORS.map((s) => (
                            <SubprocessorItem>
                                <SubprocessorName>
                                    <p>{s.name}</p>
                                    <a href={`https://${s.url}`}>{s.url}</a>
                                </SubprocessorName>
                                <p>{s.description}</p>
                                <p>{s.location}</p>
                            </SubprocessorItem>
                        ))
                    }
                </Wrapper>
			</main>
		</>
	);
}
