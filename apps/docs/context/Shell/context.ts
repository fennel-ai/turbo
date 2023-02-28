import { createContext } from "react";

export type ShellContext = {
	showMobileMenu: boolean;
	toggleMobileMenu: () => void;
	closeMobileMenu: () => void;
};

export default createContext<ShellContext>({
	showMobileMenu: false,
	toggleMobileMenu: () => {},
	closeMobileMenu: () => {},
});