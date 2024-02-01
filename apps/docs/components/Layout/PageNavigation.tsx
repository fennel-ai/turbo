import { FC, useState, useEffect } from 'react'
// import { type DocHeading } from '../../contentlayer/document/Doc'
// import { getNodeText, sluggifyTitle } from '../../utils/sluggify'
// import { Icon } from './Icon'
import styled from "@emotion/styled";
import { media } from 'styles/utils';
import { motion } from 'framer-motion';

const Root = styled.aside`
	display: none;
	${media('lg')} {
		display: block;
		grid-column: span 1;
		max-height: calc(100vh - 8rem);
		overflow-y: auto;
		overflow-x: hidden;
		position: sticky;
		top: 8rem;
	}
`;

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
`;

const NavItem = styled.a<{active?: boolean}>`
    color: ${({theme, active}) => active? theme.primary.accent : theme.on_alt};
`

const sluggifyTitle = (title: string) => {
    const _title = title.replace(/[^a-zA-Z0-9 ]/g, "");
    return _title.toLowerCase().split(' ').join('-');
}

export const PageNavigation: FC<{ headings: any[] }> = ({ headings }) => {
  const [activeHeading, setActiveHeading] = useState('')

  useEffect(() => {
    const handleScroll = () => {
      let current = ''
      for (const heading of headings) {
        const slug = sluggifyTitle(heading.title);
        const element = document.getElementById(slug)
        if (element && element.getBoundingClientRect().top < 300) {
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

  const headingsToRender = headings.filter((_) => _.level == 2)

  if ((headingsToRender ?? []).length === 0) return null

  return (
    <Root>
      <Header>In this Section</Header>
      <H2List>
        {headingsToRender.map(({ title, level }, index) => (
          <li key={index}>
            <NavItem
              href={`#${sluggifyTitle(title)}`}
              active={sluggifyTitle(title) == activeHeading}
            >
                {title}
            </NavItem>
          </li>
        ))}
      </H2List>
    </Root>
  )
}