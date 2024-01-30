import Link from 'next/link';
import { Image } from './Image';
import { TitleBlock } from './TitleBlock';
import { Table } from './Table';
import { CodeSnippet } from './CodeSnippet';

export { Admonition } from './Admonition';
export { Grid } from './Grid';
export { PageReference } from './PageReference';
export { TypesList } from './TypesList';
export { TypesListRow } from './TypesListRow';
export const h1 = TitleBlock;
export const a = Link;
export const table = Table;
export const pre = CodeSnippet;
export const img = Image;
export {Expandable} from './Expandable';