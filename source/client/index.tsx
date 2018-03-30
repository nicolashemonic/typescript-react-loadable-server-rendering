import React from "react";
import ReactDOM from "react-dom";
import Loadable from "react-loadable";
import App from "../universal/app";
import { BrowserRouter } from "react-router-dom";

window["main"] = () => {
    Loadable.preloadReady().then(() => {
        ReactDOM.hydrate(
            <BrowserRouter>
                <App />
            </BrowserRouter>,
            document.getElementById("app")
        );
    });
};
