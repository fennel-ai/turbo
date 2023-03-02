import Link from 'next/link';
export { Admonition } from './Admonition';
import { Image } from './Image';
import { TitleBlock } from './TitleBlock';
import { Table } from './Table';
import { CodeSnippet } from './CodeSnippet';

export const h1 = TitleBlock;
export const a = Link;
export const table = Table;
export const pre = CodeSnippet;
export const img = Image;