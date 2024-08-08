import Header from "./header";

import type { FC, ReactNode } from "react";

const Layout: FC<{ children: ReactNode }> = ({ children }) => (
  <>
    <Header />
    {children}
  </>
);

export default Layout;
