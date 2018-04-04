import { Action, ActionCreator, Dispatch } from "redux";
import { ThunkAction } from "redux-thunk";

export type LocationAction = ISetLocationChanged;

export interface ISetLocationChanged extends Action {
    type: "SET_LOCATION_CHANGED";
    locationChanged: boolean;
}

export const setLocationChanged: ActionCreator<ISetLocationChanged> = () => ({
    type: "SET_LOCATION_CHANGED",
    locationChanged: true
});