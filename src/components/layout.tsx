import { Header } from "./header";

import type { FC, ReactNode } from "react";

export const Layout: FC<{ children: ReactNode }> = ({ children }) => (
  <>
    <Header />
    {children}
  </>
);
