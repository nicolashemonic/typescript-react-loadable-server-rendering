import { combineReducers, Reducer } from "redux";

import { IState } from "../models";
import about, { AboutState } from "./about";
import location, { LocationState } from "./location";

export default combineReducers<IState>({
    about: about as Reducer<AboutState>,
    location: location as Reducer<LocationState>
});
