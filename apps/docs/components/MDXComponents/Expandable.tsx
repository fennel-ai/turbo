import { PropsWithChildren, useState } from "react";
import styled from "@emotion/styled";
import ChevronRightSmallIcon from 'ui/icons/chevron-right-small.svg';
import ChevronDownSmallIcon from 'ui/icons/chevron-down-small.svg';

const Root = styled.div`
    font-size: inherit;
    line-height: inherit;
`;

const Title = styled.span<{ optional?: boolean, present?: boolean }>`
    color: ${({ theme }) => theme.on};
    ${({ theme }) => theme.syntax.label.default};
    ${props => props.present && `
        &:after {
            content: "${props.optional ? ":?" : ":" }";
            color: ${props.theme.on_alt};
        }
    `}
`;

const Separator = styled.span<{ show?: boolean }>`
    display: ${({ show }) => show ? 'inline' : 'none'};
    color: ${({ theme }) => theme.color.grey['60']};
`;

const TitleContainer = styled.div`
    display: flex;
    padding: 0.5rem;
    align-items: center;
    gap: 0.25rem;
    align-self: stretch;
    cursor: pointer;
    position: relative;
`;

const ExpandedIcon = styled.span`
    position: absolute;
    left: -1.25rem;
    top: 30%;
    height: 1rem;
    width: 1rem;
    & path {
        fill: ${({ theme }) => theme.on_alt};
    }
`;

const Type = styled.span<{isEnum?: boolean; noTitle?: boolean; }>`
    ${({ noTitle, theme }) => theme.syntax.label[noTitle ? 'default' : 'small']};
    color: ${({ noTitle, theme, isEnum }) => noTitle ? theme.on : theme[isEnum ? 'success' : 'primary'].accent};
`;

const DefaultValue = styled.span`
    font-size: 0.75rem;
    color: ${({ theme }) => theme.on_alt};
`;

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
        ${({ theme }) => theme.body.default};
    }
`;

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
                <Title>
                    {title}
                    <Separator show={!!title && !!type}>:</Separator>
                </Title>
                {
                    !isTypeEnum ? <Type noTitle={!title}>{type}</Type> 
                    : (
                        <>
                            {type.map((val, index) => {
                                return <><Type isEnum key={val}>{val}</Type> {index !== type.length - 1 && " | "}</>
                            })}
                        </>
                    )
                }
                {
                    defaultVal ? (
                        <DefaultValue>
                            {`default: ${defaultVal}`}
                        </DefaultValue>
                    ) : null
                }
            </TitleContainer>
            {
                isExpanded ? 
                    <Child>
                        {optional && <DefaultValue><p>Optional</p></DefaultValue>}
                        {children}
                    </Child>
                : null  
			}
            
		</Root>
	);
};