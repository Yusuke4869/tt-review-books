import { Route, Switch } from "wouter";

import { Detail } from "~/pages/detail";
import { Edit } from "~/pages/edit";
import { Home } from "~/pages/home";
import { Login } from "~/pages/login";
import { NewReview } from "~/pages/new";
import { Profile } from "~/pages/profile";
import { SignUp } from "~/pages/signup";

import type { FC } from "react";

const Router: FC = () => (
  <Switch>
    <Route component={Home} path="/" />
    <Route component={Login} path="/login" />
    <Route component={SignUp} path="/signup" />
    <Route component={Profile} path="/profile" />
    <Route component={NewReview} path="/new" />
    <Route component={Detail} path="/detail/:id" />
    <Route component={Edit} path="/edit/:id" />
    <Route>404, Not Found</Route>
  </Switch>
);

export default Router;
