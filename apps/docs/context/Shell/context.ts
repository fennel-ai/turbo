import { createContext } from "react";

export type ShellContext = {
	showMobileMenu: boolean;
	toggleMobileMenu: () => void;
};

export default createContext<ShellContext>({
	showMobileMenu: false,
	toggleMobileMenu: () => {},
});