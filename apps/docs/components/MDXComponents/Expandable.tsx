import { PropsWithChildren, useState } from "react";
import styled from "@emotion/styled";
import { media } from "styles/utils";
import ChevronRightSmallIcon from 'ui/icons/chevron-right-small.svg';
import ChevronDownSmallIcon from 'ui/icons/chevron-down-small.svg';

const Root = styled.div`
    font-size: inherit;
    line-height: inherit;
`;


const Title = styled.span<{optional?: boolean}>`
    color: ${({ theme }) => theme.on};
    font-family: "JetBrains Mono",monospace;
    &:after {
        content: "${({ optional }) => !!optional ? ":?" : ":" }";
        color: #B42934;
    }
`



const TitleContainer = styled.div`
display: flex;
padding: 0.5rem;
align-items: center;
gap: 0.5rem;
align-self: stretch;
cursor: pointer;
`

const ExpandedIcon = styled.span`
    margin-left: -1.25rem;
    margin-top: 0.5rem;
    & path {
        fill: ${({ theme }) => theme.on_alt};
    }
`

const Type = styled.span<{isEnum?: boolean}>`
    font-family: "JetBrains Mono",monospace;
    color: ${({ theme, isEnum }) => isEnum ? theme.success.accent : theme.primary.accent};
`

const DefaultValue = styled.span`
    color: rgba(${({ theme }) => theme.on}, 0.5);
`
const Child = styled.div`
display: flex;
padding: 0rem 0.5rem;
flex-direction: column;
align-items: flex-start;
align-self: stretch;
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
            <Title optional={optional}>
                {title}
            </Title>

            {!isTypeEnum ? <Type>{type}</Type> : <>
                {type.map((val, index) => {
                    return <><Type isEnum>{val}</Type> {index!==type.length-1 && " | "}</>
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
                {optional && <div>Optional</div>}
                {children}
            </Child>
			}
            
		</Root>
	);
};