import { createStore as createReduxStore, applyMiddleware } from "redux";
import reducers from "./reducers";
import thunkMiddleware from "redux-thunk";
import { createLogger } from "redux-logger";
import { IState } from "../universal/models/state";

const loggerMiddleware = createLogger({
    level: "info"
});

export default function createStore(preloadedState?: IState) {
    return createReduxStore<IState>(
        reducers,
        preloadedState,
        applyMiddleware(thunkMiddleware, loggerMiddleware)
    );
}
