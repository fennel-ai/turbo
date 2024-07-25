import { ReactNode } from 'react';
import Link from 'next/link';
import { Image } from './Image';
import { TitleBlock } from './TitleBlock';
import { Table } from './Table';
import { CodeSnippet, type CodeSnippetProps } from './CodeSnippet';
import { Sticky } from './Sticky';
import { Paragraph } from './Paragraph';

export { Admonition } from './Admonition';
export { Grid } from './Grid';
export { PageReference } from './PageReference';
export { TypesList } from './TypesList';
export { TypesListRow } from './TypesListRow';
export { Expandable } from './Expandable';
export { Sticky } from './Sticky';
export { Divider, LeftSection, RightSection } from './Divider';
export { ContentBlock } from './ContentBlock';

export const h1 = TitleBlock;
export const a = Link;
export const p = Paragraph;
export const table = Table;
export const img = Image;
export const pre = (props: CodeSnippetProps) => {
    return (
        <Sticky>
            <CodeSnippet>
                <pre {...props} />
            </CodeSnippet>
        </Sticky>
    )
};

export const CodeTabs = (props: { children: ReactNode }) =>  {
    return (
        <Sticky>
            <CodeSnippet>{props.children}</CodeSnippet>
        </Sticky>
    );
}

export { SplitLayoutContext, SplitLayoutProvider } from "./context/SplitLayoutContext";