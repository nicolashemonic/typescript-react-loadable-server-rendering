import React from "react";
import Loadable from "react-loadable";
import Loading from "../components/loading";

const LoadableExample = Loadable({
    loader: () => import(/* webpackChunkName: "hello" */ "../components/hello"),
    loading: Loading
});

export default function App() {
    return <LoadableExample />;
}
