import { StrictMode } from "react";
import "~/styles/global.css";

import Router from "./routes";

import type { FC } from "react";

const App: FC = () => (
  <StrictMode>
    <Router />
  </StrictMode>
);

export default App;
