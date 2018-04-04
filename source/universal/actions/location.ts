import { Action, ActionCreator } from "redux";

export type LocationAction = ISetLocationChanged;

export interface ISetLocationChanged extends Action {
    type: "SET_LOCATION_CHANGED";
    locationChanged: boolean;
}

export const setLocationChanged: ActionCreator<ISetLocationChanged> = () => ({
    type: "SET_LOCATION_CHANGED",
    locationChanged: true
});
