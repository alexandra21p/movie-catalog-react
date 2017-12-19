import React from "react";
import { Switch, Route } from "react-router-dom";
import MovieList from "./MovieList";
import MovieDetails from "./MovieDetails";

const Movies = () => (
    <Switch>
        <Route exact path="/movies" component={ MovieList } />
        <Route path="/movies/:id" component={ MovieDetails } />
    </Switch>
);

export { Movies };
