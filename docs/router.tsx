import * as React from "react";
import {
    Switch,
    Route,
    Redirect
} from "react-router-dom";
import Examples from "./examplesRouter";
import Home from "./components/Home";

export default () => (
    <Switch>
        <Route path="/components">
            <Examples />
        </Route>
        <Route path="/" exact component={Home} />
        <Redirect to="/" />
    </Switch>
);
