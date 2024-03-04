import { PropsWithChildren, useState } from "react";
import styled from "@emotion/styled";
import ChevronDownSmallIcon from 'ui/icons/chevron-down-small.svg';
import { stateLayer } from "styles/utils";

const TitleContainer = styled.div`
    display: flex;
    padding: 0.5rem;
    align-self: stretch;
    cursor: pointer;
    position: relative;
    ${stateLayer()};

    ::before {
        border-radius: ${({ theme }) => theme.radii.sm};
    }
`;

const Title = styled.span`
    color: ${({ theme }) => theme.on};
    ${({ theme }) => theme.syntax.label.default};
`;

const Separator = styled.span<{ show?: boolean }>`
    display: ${({ show }) => show ? 'inline' : 'none'};
    color: ${({ theme }) => theme.color.grey['60']};
    margin-right: 0.25rem;
`;

const Type = styled.span<{ isEnum?: boolean; noTitle?: boolean; }>`
    ${({ noTitle, theme }) => theme.syntax.label[noTitle ? 'default' : 'small']};
    color: ${({ noTitle, theme, isEnum }) => noTitle ? theme.on : theme[isEnum ? 'success' : 'primary'].accent};
`;

const ExpandedIcon = styled(ChevronDownSmallIcon)`
    position: absolute;
    right: 100%;
    top: 0.5rem;
    transform: ${({ expanded }) => `rotateZ(${expanded ? 0 : -90}deg)`};
    transform-origin: center center;
    transition: 160ms transform ease-out;
    
    & path {
        fill:  ${({ theme }) => theme.on_alt};
    }
`;

const Child = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    align-self: stretch;
    gap: 0.5rem;
    padding-left: 0.5rem;
    padding-right: 0.5rem;
    padding-bottom: 1.5rem;
`;

const Content = styled.div`
    display: flex;
    flex-direction: column;
    gap: 1rem;

    & p {
        margin: 0;
        ${({ theme }) => theme.body.default};
    }
`;

const Meta = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 1rem;

    & > p {
        margin: 0;
        ${({ theme }) => theme.body.small};
        color: ${({ theme }) => theme.on_alt};
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
		<div>
            <TitleContainer onClick={()=>toggleExpanded(!isExpanded)}>
                <ExpandedIcon expanded={isExpanded} />
                {title ? (
                    <Title>
                        {title}
                        <Separator show={!!title && !!type}>:</Separator>
                    </Title>
                ) : null}
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
            </TitleContainer>
            {
                isExpanded ? 
                    <Child>
                        {
                            defaultVal || optional ? (
                                <Meta>
                                    {optional ? <p>Optional</p> : null}
                                    {defaultVal ? <p>{`Default: ${defaultVal}`}</p> : null}
                                </Meta>
                            ) : null
                        }
                        <Content>
                            {children}
                        </Content>
                    </Child>
                : null  
			}
            
		</div>
	);
};