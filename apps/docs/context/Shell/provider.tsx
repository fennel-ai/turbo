import { useCallback, useState, PropsWithChildren } from 'react';
import Context from './context';

export const ShellContextProvider = ({ children }: PropsWithChildren) => {
	const [showMobileMenu, setShowMobileMenu] = useState(false);

	const handleToggleMenu = useCallback(() => {
		setShowMobileMenu(prev => !prev);
	}, []);

	const value = {
		showMobileMenu,
		toggleMobileMenu: handleToggleMenu
	};

	return (
		<Context.Provider value={value}>
			{children}
		</Context.Provider>
	)
};