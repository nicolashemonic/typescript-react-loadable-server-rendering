import React from "react";
import { LoadableAbout, LoadableHome } from "../loadable/pages";
import { Route } from "react-router-dom";

export default function App() {
    return (
        <div>
            <Route exact path="/" component={LoadableHome} />
            <Route exact path="/about" component={LoadableAbout} />
        </div>
    );
}
