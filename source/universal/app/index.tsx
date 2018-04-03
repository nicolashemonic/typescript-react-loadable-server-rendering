import React from "react";
import { Route, Switch } from "react-router-dom";
import { routes } from "../Routes";

export default function App() {
    return (
        <div>
            <Switch>{routes.map(route => <Route {...route} key={route.path} />)}</Switch>
        </div>
    );
}
