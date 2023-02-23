import { useContext } from "react";
import ShellContext from './context';

export const useShell = () => {
	const context = useContext(ShellContext);
	if (!context) {
		throw new Error("useShell must be used within a ShellProvider");
	}
	return context;
}