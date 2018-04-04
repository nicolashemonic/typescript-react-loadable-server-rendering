import { combineReducers } from "redux";

import { IState } from "../models";
import about from "./about";
import location from "./location";

export default combineReducers<IState>({
    about,
    location
});
