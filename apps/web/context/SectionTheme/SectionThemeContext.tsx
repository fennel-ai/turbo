import { createContext } from 'react';

const context = createContext<"light" | "dark" | undefined>(undefined);

export default context;