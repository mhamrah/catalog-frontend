import React from "react";
import { Route, Switch } from "react-router-dom";
import ListServices from "./containers/ListServices";
import CreateService from "./containers/CreateService";
import NotFound from "./containers/NotFound";

export default ({ childProps }) => (
  <Switch>
    <Route path="/" exact component={ListServices} props={childProps} />
    <Route
      path="/services/new"
      exact
      component={CreateService}
      props={childProps}
    />

    {/* Finally, catch all unmatched routes */}
    <Route component={NotFound} />
  </Switch>
);
