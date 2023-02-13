import { createContext } from "react";

type LayoutContext = {
	frontmatter?: Record<string, string | undefined>
};

export default createContext<LayoutContext>({});