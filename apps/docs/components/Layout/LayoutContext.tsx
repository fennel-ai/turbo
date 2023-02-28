import { NavigationPage, NavigationSection } from "lib/utils";
import { createContext } from "react";

type LayoutContext = {
	page: NavigationPage, 
	frontmatter?: Record<string, string>,
	section: NavigationSection, 
};

export default createContext<LayoutContext>({
	frontmatter: {} as Record<string, string>,
	page: {} as NavigationPage,
	section: {} as NavigationSection,
});