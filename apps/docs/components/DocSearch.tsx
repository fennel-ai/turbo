import { forwardRef, useCallback, useImperativeHandle, useRef, useState } from 'react';
import { createPortal } from 'react-dom';

import { DocSearchModal, useDocSearchKeyboardEvents } from '@docsearch/react';
import type { DocSearchProps } from '@docsearch/react';
import { Searchbar } from 'ui';

export type DocSearchHandle = {
	open: () => void;
	close: () => void;
}

export const DocSearch = forwardRef <DocSearchHandle, DocSearchProps>((props, ref) => {
	const searchButtonRef = useRef<HTMLButtonElement>(null);
	const [isOpen, setIsOpen] = useState(false);
	const [initialQuery, setInitialQuery] = useState<string | undefined>(props?.initialQuery || undefined);

	const onOpen = useCallback(() => {
		setIsOpen(true);
	}, []);
	
	const onClose = useCallback(() => {
		setIsOpen(false);
	}, []);

	const onInput = useCallback((event: KeyboardEvent) => {
		setIsOpen(true);
		setInitialQuery(event.key);
	}, []);

	useDocSearchKeyboardEvents({
		isOpen,
		onOpen,
		onClose,
		onInput,
		searchButtonRef,
	});

	useImperativeHandle(ref, () => ({
		open: onOpen,
		close: onClose,
	}));

	return (
		<>
			<Searchbar placeholder="Search the Docs" ref={searchButtonRef} onClick={onOpen} />
			{
				isOpen ? createPortal(
					<DocSearchModal 
						{...props}
						initialScrollY={window.scrollY}
						initialQuery={initialQuery}
						translations={props?.translations?.modal}
						onClose={onClose}
					/>,
					document.body
				) : null
			}
		</>
	);
});

DocSearch.displayName = 'DocSearch';