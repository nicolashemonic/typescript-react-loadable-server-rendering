import React from "react";
import ReactDOM from "react-dom";
import Loadable from "react-loadable";
import App from "../universal/app";

window["main"] = () => {
    Loadable.preloadReady().then(() => {
        ReactDOM.hydrate(<App />, document.getElementById("app"));
    });
};
