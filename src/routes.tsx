import { Route, Switch } from "wouter";

import { Home } from "~/pages/home";
import { Login } from "~/pages/login";
import { SignUp } from "~/pages/signup";
import { Profile } from "./pages/profile";

import type { FC } from "react";

const Router: FC = () => (
  <Switch>
    <Route component={Home} path="/" />
    <Route component={Login} path="/login" />
    <Route component={SignUp} path="/signup" />
    <Route component={Profile} path="/profile" />
    <Route>404, Not Found</Route>
  </Switch>
);

export default Router;
