import { combineReducers, Reducer } from "redux";

import { IState, IAboutState, IApiState, ILocationState } from "../models";
import about from "./about";
import api from "./api";
import location from "./location";

export default combineReducers<IState>({
    about: about as Reducer<IAboutState>,
    location: location as Reducer<ILocationState>,
    api: api as Reducer<IApiState>
});
