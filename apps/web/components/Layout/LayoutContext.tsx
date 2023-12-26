import { createContext } from "react";
import type { NavigationPage, NavigationSection } from "lib/utils";

type LayoutContext = {
	page: NavigationPage, 
	section: NavigationSection, 
};

export default createContext<LayoutContext>({
	page: {} as NavigationPage,
	section: {} as NavigationSection
});