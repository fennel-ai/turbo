import styled from "@emotion/styled";
import { Button, Container, PillButton } from "ui";
import MailIcon from "ui/icons/mail.svg";

import JobListing from "./JobListing";
import { media } from "styles/utils";

const Root = styled.div`
    position: relative;
    padding: 3rem 0 5rem 0;
`;

const Wrapper = styled(Container)`
	display: grid;
	grid-template-columns: repeat(12, 1fr);
    grid-row-gap: 2.5rem;
`;

const List = styled.div`
    grid-column: span 12;

    ${media('md')} {
        grid-column: 4 / span 6;
    }
`;

const ListTitle = styled.div`
    padding: 0.5rem 1rem;
    border-bottom: 1px solid ${({ theme }) => theme.border.light};

    & h4 {
        color: ${({ theme }) => theme.on_alt};
        opacity: 0.64;
        user-select: none;
        text-transform: uppercase;
        margin: 0;
        font-size: 1rem;
        line-height: 1.5rem;
    }
`;

const ApplyCTA = styled.div`
    grid-column: span 12;
    display: flex;
    flex-direction: column;
    gap: 2rem;
    padding: 0 1rem;
    color: ${({ theme }) => theme.on};

    ${media('md')} {
        grid-column: 4 / span 6;
        flex-direction: row;
        align-items: flex-start;
        justify-content: flex-start;
    }
`;

const CTAContent = styled.div`
    max-width: 24.5rem;

    & h5 {
        margin: 0;
        font-size: 1.125rem;
        line-height: 1.5rem;
        font-variation-settings: "wght" 600;
    }

    & p {
        margin: 0;
        font-size: 0.875rem;
        line-height: 1.5rem;
    }
`;

const JobList = () => {
    return <Root>
        <Wrapper>
            <List>
                <ListTitle><h4>Open Roles</h4></ListTitle>
                <JobListing name="Account Executive" location="Palo Alto, CA | Remote" modality="Full-Time" href="https://app.dover.io/apply/Fennel/aa2b5348-afe5-49b8-8f66-d8d97e54c690" />
                <JobListing name="Founding Marketing Lead" location="Palo Alto, CA | Remote" modality="Full-Time" href="https://app.dover.io/apply/Fennel/797bbc98-e381-4d2b-ac2d-fbd5d04674ea" />
            </List>
            <ApplyCTA>
                <CTAContent>
                    <h5>
                        Interested but don't see a role for you?
                    </h5>
                    <p>Send us an email telling us a bit about yourself, including your resume or relevant links, and how you would like to contribute at Fennel.</p>
                </CTAContent>
                <PillButton icon={<MailIcon />} size="large">
                    hello@fennel.ai
                </PillButton>
            </ApplyCTA>
        </Wrapper> 
    </Root>
};

export default JobList;