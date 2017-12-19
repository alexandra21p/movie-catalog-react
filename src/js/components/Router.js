import { Switch, Route } from "react-router-dom";
import React from "react";
import Home from "./Home";
import { Movies } from "./Movies";

const Router = () => (
    <Switch>
        <Route exact path="/" component={ Home } />
        <Route path="/movies" component={ Movies } />
    </Switch>
);

export default Router;
