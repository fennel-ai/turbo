import { PropsWithChildren, useState } from "react";
import styled from "@emotion/styled";
import { media, rgba } from "styles/utils";
import ChevronRightSmallIcon from 'ui/icons/chevron-right-small.svg';
import ChevronDownSmallIcon from 'ui/icons/chevron-down-small.svg';

const Root = styled.div`
font-size: inherit;
line-height: inherit
`;


const Title = styled.span<{optional?: boolean, present? :boolean}>`
    font-size: 0.875rem;
    line-height: 1rem;
    color: ${({ theme }) => theme.on};
    font-family: ${({ theme }) => theme.fontFamilies.mono}, monospace;
    ${props => props.present && `
    &:after {
        content: "${props.optional ? ":?" : ":" }";
        color: ${props.theme.on_alt};
    }
    `}

`



const TitleContainer = styled.div`
display: flex;
padding: 0.5rem;
align-items: center;
gap: 0.25rem;
align-self: stretch;
cursor: pointer;
position: relative;
font-weight: ${props => props.theme.type === "dark" ? props.theme.fontWeights.primary.regular : props.theme.fontWeights.primary.medium};
`

const ExpandedIcon = styled.span`
    position: absolute;
    left: -1.25rem;
    top: 30%;
    height: 1rem;
    width: 1rem;
    & path {
        fill: ${({ theme }) => theme.on_alt};
    }
`

const Type = styled.span<{isEnum?: boolean}>`
    font-family: ${({ theme }) => theme.fontFamilies.mono}, monospace;
    font-size: 0.75rem;
    line-height: 1rem;
    color: ${({ theme, isEnum }) => isEnum ? theme.success.accent : theme.primary.accent};
`

const DefaultValue = styled.span`
    font-size: 0.75rem;
    color: ${({ theme }) => theme.on_alt};
`
const Child = styled.div`
display: flex;
flex-direction: column;
align-items: flex-start;
margin-left: 0.5rem;
align-self: stretch;
margin-bottom: 1.5rem;
& p:first-of-type{
    margin-top: 0px;
}

& > p {
    font-size: 1rem !important;
    line-height: 1.75rem !important;
    font-weight: ${props => props.theme.type === "dark" ? props.theme.fontWeights.primary.regular : props.theme.fontWeights.primary.medium};
}
`

interface Props {
    title: string;
    type: string | string[];
    collapsed?: boolean;
    optional?: boolean;
    defaultVal?: string;
}

export const Expandable = ({ title, optional, defaultVal, type, collapsed, children }: PropsWithChildren<Props>) => {
    const [isExpanded, toggleExpanded] = useState(!!!collapsed);
    const isTypeEnum = Array.isArray(type);
	return (
		<Root>
            <TitleContainer onClick={()=>toggleExpanded(!isExpanded)}>
                <ExpandedIcon>
                    {isExpanded ? <ChevronDownSmallIcon/> : <ChevronRightSmallIcon/>}
                </ExpandedIcon>
            <Title optional={optional} present={title?.length > 0 && type?.length > 0}>
                {title}
            </Title>

            {!isTypeEnum ? <Type>{type}</Type> : <>
                {type.map((val, index) => {
                    return <><Type isEnum key={val}>{val}</Type> {index!==type.length-1 && " | "}</>
                })}
            </>
            }
            {defaultVal && <DefaultValue>
                {`default: ${defaultVal}`}
            </DefaultValue>
            }
            </TitleContainer>
            {isExpanded && 
            <Child>
                {optional && <DefaultValue><p>Optional</p></DefaultValue>}
                {children}
            </Child>
			}
            
		</Root>
	);
};