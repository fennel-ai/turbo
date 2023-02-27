import { useCallback, useRef, useState } from 'react';
import { createPortal } from 'react-dom';

import { DocSearchModal, useDocSearchKeyboardEvents } from '@docsearch/react';
import type { DocSearchProps } from '@docsearch/react';
import { Searchbar } from 'ui';

export function DocSearch(props: DocSearchProps) {
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

	return (
		<>
			<Searchbar ref={searchButtonRef} onClick={onOpen} />
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
}