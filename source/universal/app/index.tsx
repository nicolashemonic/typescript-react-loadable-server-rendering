import React from "react";
import Loadable from "react-loadable";
import Loading from "../components/loading";
import { Route, Link } from "react-router-dom";

const LoadableExample = Loadable({
    loader: () => import(/* webpackChunkName: "hello" */ "../components/hello"),
    loading: Loading
});

const LoadableAnother = Loadable({
    loader: () => import(/* webpackChunkName: "another" */ "../components/another"),
    loading: Loading
});

export default function App() {
    return (
        <div>
            <Route exact path="/" component={LoadableExample} />
            <Route exact path="/another" component={LoadableAnother} />
        </div>
    );
}
