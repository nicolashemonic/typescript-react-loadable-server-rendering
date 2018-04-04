import React from "react";
import ReactDOM from "react-dom";
import Loadable from "react-loadable";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";

import App from "../universal/app";
import createStore from "../universal/Store";

window.main = () => {
    const preloadedState = window.__PRELOADED_STATE__;
    const store = createStore(preloadedState);

    delete window.__PRELOADED_STATE__;

    Loadable.preloadReady().then(() => {
        ReactDOM.hydrate(
            <Provider store={store}>
                <BrowserRouter>
                    <App />
                </BrowserRouter>
            </Provider>,
            document.getElementById("app")
        );
    });
};
