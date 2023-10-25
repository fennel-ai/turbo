import styled from "@emotion/styled";
import { Button, Container, PillButton } from "ui";
import MailIcon from "ui/icons/mail.svg";

import JobListing from "./JobListing";

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
    grid-column: 4 / span 6;
`;

const ListTitle = styled.div`
    padding: 0.5rem 1rem;
    border-bottom: 1px solid ${({ theme }) => theme.border};

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
    grid-column: 4 / span 6;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 2rem;
    padding: 0 1rem;
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
                <JobListing name="Full-Stack Engineer" location="Remote" modality="Full-Time" href="https://fennel.ai" />
                <JobListing name="Systems Engineer" location="Bay Area" modality="Full-Time" href="https://fennel.ai" />
                <JobListing name="Systems Engineer" location="Remote" modality="Full-Time" href="https://fennel.ai" />
                <JobListing name="Sales Development Representative" location="Remote" modality="Full-Time" href="https://fennel.ai" />
            </List>
            <ApplyCTA>
                <CTAContent>
                    <h5>
                        Interested but don't see a role for you?
                    </h5>
                    <p>Eos sit qui placeat et id. Velit quis atque non nam. Similique id officia dolor harum vitae rerum.</p>
                </CTAContent>
                <PillButton icon={<MailIcon />} size="large">
                    hello@fennel.ai
                </PillButton>
            </ApplyCTA>
        </Wrapper> 
    </Root>
};

export default JobList;