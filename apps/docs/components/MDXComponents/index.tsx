import Link from 'next/link';
import { Image } from './Image';
import { TitleBlock } from './TitleBlock';
import { Table } from './Table';
import { CodeSnippet, type CodeSnippetProps } from './CodeSnippet';
import { ReactNode } from 'react';

export { Admonition } from './Admonition';
export { Grid } from './Grid';
export { PageReference } from './PageReference';
export { TypesList } from './TypesList';
export { TypesListRow } from './TypesListRow';
export {Expandable} from './Expandable';
export { Divider, LeftSection, RightSection } from './Divider';

export const h1 = TitleBlock;
export const a = Link;
export const table = Table;
export const pre = (props: CodeSnippetProps) => {
    return (
        <CodeSnippet>
            <pre {...props} />
        </CodeSnippet>
    )
};

export const CodeTabs = (props: { active?: string, children: ReactNode }) =>  {
    return <CodeSnippet defaultActive={props.active}>{props.children}</CodeSnippet>
}
export const img = Image;