import { useCallback, useState, PropsWithChildren } from 'react';
import Context from './context';

export const ShellContextProvider = ({ children }: PropsWithChildren) => {
	const [showMobileMenu, setShowMobileMenu] = useState(false);

	const handleToggleMenu = useCallback(() => {
		setShowMobileMenu(prev => !prev);
	}, []);
	
	const closeMobileMenu = useCallback(() => {
		setShowMobileMenu(false);
	}, []);

	const value = {
		showMobileMenu,
		toggleMobileMenu: handleToggleMenu,
		closeMobileMenu,
	};

	return (
		<Context.Provider value={value}>
			{children}
		</Context.Provider>
	)
};