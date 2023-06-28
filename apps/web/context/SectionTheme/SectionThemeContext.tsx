import { createContext } from 'react';

const context = createContext<"light" | "dark" | false>(false);

export default context;