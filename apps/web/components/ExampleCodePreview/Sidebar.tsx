import { useMemo, useState, type MouseEventHandler } from 'react';
import styled from '@emotion/styled';
import { rgba, stateLayer } from 'styles/utils';

import GithubIcon from 'ui/icons/github.svg';
import FolderIcon from 'ui/icons/folder.svg';
import PythonIcon from 'ui/icons/python.svg';

const Root = styled.div`
    padding: 0.375rem;
    color: ${({ theme }) => theme.primary.on_container};
`;

const Header = styled.div`
    margin: 0.25rem 0;
    padding: 0.375rem;
    display: flex;
    align-items: center;
    gap: 0.5rem;
    font-size: 0.75rem;
    line-height: 1.25rem;

    & svg {
        width: 1rem;
        height: 1rem;
    }
`;

const TreeList = styled.ul`
    padding: 0;
    list-style: none;

    li {
        padding: 0 0.375rem;
        height: 1.75rem; 
        ${stateLayer({ initial: 0, interact: true })}
        display: flex;
        align-items: center;
        gap: 0.5rem;
        overflow: hidden;
        border-radius: 0.375rem;
        font-size: 0.75rem;
        line-height: 1.25rem;
        cursor: pointer;

        &[data-selected=true] {
            box-shadow: 0 0 0 0.5px ${({ theme }) => rgba(theme.primary.on_container, 0.06)};
            background-image: radial-gradient(124.43% 148.21% at 56.38% 28.57%, rgba(18, 18, 18, 0) 23.5%, rgba(18, 18, 18, 0.11) 100%);
        }

        & svg {
            width: 1rem;
            height: 1rem;
        }
    }

    & ul li {
        padding-left: 1.5rem;
    }
`;

export interface FileTree {
    [key: string]: FileTree | string;
}

interface TreeNodeProps {
    active?: string;
    node: FileTree;
    onClickItem: (value: string) => void;
}

interface TreeItemProps {
    active?: string;
    label: string; 
    value: FileTree | string; 
    onClick: (value: string) => void;
}

const TreeItem: React.FC<TreeItemProps> = ({ active, label, onClick, value }) => {
    const [expanded, setExpanded] = useState<boolean>(false);
    const isDirectory = typeof value !== 'string';

    const handleClick: MouseEventHandler = (e) => {
        e.stopPropagation();
        if (isDirectory) {
            setExpanded(prev => !prev);
        } else {
            onClick(value as string)
        }
    }

    const isChildActive = useMemo(() => {
        if (isDirectory) {
            const node = value as FileTree;
            return Object.values(node).includes(active!)
        } else {
            return false
        }
    }, [active, isDirectory]);

    return (
        <>
            <li data-selected={active === value} onClick={handleClick}>
                {isDirectory ? <FolderIcon /> : <PythonIcon />}
                {label}
            </li>
            {isDirectory && (expanded || isChildActive) ? <TreeNode active={active} onClickItem={onClick} node={value as FileTree} /> : null}
        </>
    )
};

const TreeNode: React.FC<TreeNodeProps> = ({ active, node, onClickItem }) => {
    return (
        <TreeList>
            {Object.entries(node).map(([label, value]) => {
                console.log(active, value);
                return <TreeItem active={active} key={label} onClick={onClickItem} label={label} value={value} />
            })}
        </TreeList>
    )
};

export const Sidebar = ({ currentFile, tree, onSelect }: { currentFile?: string; tree: FileTree, onSelect: (file: string) => void }) => {
    return (
        <Root>
            <Header>
                <GithubIcon />
                fennel-ai/repo-name
            </Header>
            <TreeNode active={currentFile} onClickItem={onSelect} node={tree} />
        </Root>      
    )
};