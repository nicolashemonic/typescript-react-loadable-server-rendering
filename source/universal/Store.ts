import { createStore as createReduxStore, applyMiddleware } from "redux";
import reducers from "./reducers";
import thunkMiddleware from "redux-thunk";
import { createLogger } from "redux-logger";

const loggerMiddleware = createLogger({
    level: "info"
});

export default function createStore(preloadedState?) {
    return createReduxStore(
        reducers,
        preloadedState,
        applyMiddleware(thunkMiddleware, loggerMiddleware)
    );
}
