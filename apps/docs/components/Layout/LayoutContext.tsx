import { NavigationSection } from "lib/utils";
import { createContext } from "react";

type LayoutContext = {
	frontmatter?: Record<string, string | undefined>,
	section?: NavigationSection, 
};

export default createContext<LayoutContext>({});