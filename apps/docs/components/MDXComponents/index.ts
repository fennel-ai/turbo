import { Callout } from './Callout';
import { TitleBlock } from './TitleBlock';
import { Table } from './Table';
import { CodeSnippet } from './CodeSnippet';

export const h1 = TitleBlock;
export const table = Table;
export const pre = CodeSnippet;
export const Code = ({ children }) => children;
export const Hint = Callout;