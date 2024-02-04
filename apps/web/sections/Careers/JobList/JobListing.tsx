import styled from "@emotion/styled";
import { motion } from 'framer-motion';
import { useRouter } from "next/router";

import ChevronRightIcon from 'ui/icons/chevron-right.svg';
import MarkerPinIcon from 'ui/icons/marker-pin.svg';

const Root = styled(motion.div)`
    padding: 1rem;
    display: flex;
    align-items: center;
    justify-content: space-between;
    user-select: none;
    cursor: pointer;
    color: ${({ theme }) => theme.on};

    & + & {
        border-top: 1px solid ${({ theme }) => theme.border};
    }
`;

const Meta = styled.div`
    display: flex;
    flex-direction: column;
    gap: 0;

    & h5 {
        margin: 0;
        font-size: 1.125rem;
        line-height: 1.5rem;
    }

    & p {
        margin: 0;
        font-size: 0.875rem;
        line-height: 1.5rem;
    }
`;

const Details = styled(motion.div)`
    display: flex;
    align-items: center;
    gap: 0.25rem;
    opacity: 0.5;
    color: ${({ theme }) => theme.on};

    & svg {
        width: 0.75rem;
        height: 0.75rem;
    }

    & a {
        position: relative;
        text-decoration: none;
        color: ${({ theme }) => theme.on};
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

const Indicator = styled(motion.div)`
    display: flex;
    align-items: center;
    gap: 0.25rem;

    & span {
        margin: 0;
        font-size: 0.875rem;
        line-height: 1rem;
        transform: translate3d(0, 8px, 0);
        opacity: 0;
    }
`;

const IconWrapper = styled(motion.div)`
    width: 1rem;
    height: 1rem;

    & > svg {
        width: 1rem;
        height: 1rem;
    }
`;

type JobListingProps = {
    name: string;
    href?: string;
    location: string;
    modality: string;
}

const VARIANTS = {
    apply: {
        default: {
            y: 8,
            opacity: 0,
        },
        hovered: {
            y: 0,
            opacity: 1,
            transition: {
                delay: 0.1,
                staggerChildren: 0.2,
            }
        }
    },
    indicator: {
        span: {
            default: {
                y: 8,
                opacity: 0,
            },
            hovered: {
                y: 0,
                opacity: 1,
            }
        },
        icon: {
            default: {
                opacity: 0.5,
            },
            hovered: {
                opacity: 1,
            }
        }
    }
}

const JobListing = ({ href, location, modality, name }: JobListingProps) => {
    const router = useRouter();
    return (
        <Root initial="default" whileHover="hovered" onClick={() => href ? router.push(href) : null}>
            <Meta>
                <p>{name}</p>
                <Details>
                    <MarkerPinIcon />
                    <p>{location}</p>
                    <p>·</p>
                    <p>{modality}</p>
                </Details>
            </Meta>
            <Indicator>
                <motion.span variants={VARIANTS.indicator.span}>Learn More</motion.span>
                <IconWrapper variants={VARIANTS.indicator.icon}>
                    <ChevronRightIcon />
                </IconWrapper>
            </Indicator>
        </Root>
    )
}

export default JobListing;