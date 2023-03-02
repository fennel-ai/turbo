import type { DocPage, Section } from "contentlayer/generated";
import { NavigationPage, NavigationSection } from "lib/utils";
import { createContext } from "react";

type LayoutContext = {
	page: Partial<DocPage>, 
	frontmatter?: Record<string, string>,
	section: Section, 
};

export default createContext<LayoutContext>({
	frontmatter: {} as Record<string, string>,
	page: {} as Partial<DocPage>,
	section: {} as Section
	,
});