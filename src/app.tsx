import { StrictMode } from "react";
import { CookiesProvider } from "react-cookie";

import Layout from "./components/layout";
import AuthProvider from "./contexts/auth";
import "~/styles/global.css";

import Router from "./routes";

import type { FC } from "react";

const App: FC = () => (
  <StrictMode>
    <CookiesProvider>
      <AuthProvider>
        <Layout>
          <Router />
        </Layout>
      </AuthProvider>
    </CookiesProvider>
  </StrictMode>
);

export default App;
