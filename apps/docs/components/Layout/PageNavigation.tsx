import { FC, useState, useEffect } from 'react'
import styled from "@emotion/styled";
import { media } from 'styles/utils';
import { motion } from 'framer-motion';
import { Outline } from 'lib/utils';
import Link from 'next/link';
import GitHubIcon from 'ui/icons/github.svg';
import { version } from 'contentlayer/generated';

const Root = styled.div`
	display: none;
	${media('lg')} {
		display: block;
		grid-column: span 1;
		max-height: calc(100vh - 12rem);
    position: sticky;
		top: 11rem;
	}
`;

const Wrapper = styled.div`
    overflow-y: auto;
		overflow-x: hidden;
`

const Header = styled.h4`
    font-size: 1rem
    font-style: normal;
    font-weight: 600;
    line-height: 1rem;
`

const H2List = styled(motion.ul)`
list-style: none;
margin: 0;
padding-left: 0;
display: flex;
flex-direction: column;
align-items: flex-start;
gap: 1rem;
font-size: 0.875rem;
padding-inline-start: 0rem;
`;

const EditOnGithub = styled(Link)`
    padding: 3rem 0;
    font-size: 0.875rem;
    line-height: 1rem;
    display: flex;
    align-items: center;
    gap: 0.5rem;
    color: ${props => props.theme.on_alt};
    &:hover{
        color: ${props => props.theme.on};
    }
`

const NavItem = styled.a<{level:number , active?: boolean}>`
    color: ${({theme, active}) => active? theme.primary.accent : theme.on_alt};   
    margin-left: ${({level }) => (level - 2)}rem
`

const sluggifyTitle = (title: string) => {
    const _title = title.replace(/[^a-zA-Z0-9- ]/g, "");
    return _title.toLowerCase().split(' ').join('-');
}

export const PageNavigation: FC<{ path: string, headings: Outline }> = ({ path, headings }) => {
  const [activeHeading, setActiveHeading] = useState('')

  useEffect(() => {
    const handleScroll = () => {
      let current = ''
      for (const heading of headings) {
        const slug = sluggifyTitle(heading.title);
        const element = document.getElementById(slug)
        if (element && element.getBoundingClientRect().top < 200) {
            current = slug
        }
      }
      setActiveHeading(current)
    }
    handleScroll()
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [headings])


  const headingsToRender = headings.filter((_) => _.level > 1)
  const [versionName, ...restPath] = path.split('/')
  const versionBranch = versionName === "main" ? "main" : version.versions?.find(v => v.name === versionName)?.head;

  return (
    <Root>
      <Wrapper>
    {(headingsToRender ?? []).length !== 0 && <>
      <Header>On This Page</Header>
      <H2List>
        {headingsToRender.map(({ title, level }, index) => (
          <li key={index}>
            <NavItem
            href={`#${sluggifyTitle(title)}`}
              active={sluggifyTitle(title) === activeHeading}
              level={level}
            >
                <span
                dangerouslySetInnerHTML={{
                  __html: title.replace('`', '<code style="font-size: 0.75rem;">').replace('`', '</code>'),
                }}
              />
            </NavItem>
          </li>
        ))}
      </H2List>
      </>}
      {path!=='/' &&
      <EditOnGithub href={`https://github.com/fennel-ai/client/blob/${versionBranch}/docs/${restPath.join('/')}`} >
        <GitHubIcon/>
        <div> Edit this Page on Github</div>
      </EditOnGithub>
      }
      </Wrapper>
    </Root>
  )
}