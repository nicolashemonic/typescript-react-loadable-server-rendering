import { Action, ActionCreator } from "redux";

export type LocationAction = SetLocationChanged;

export const SET_LOCATION_CHANGED = "SET_LOCATION_CHANGED";

export const setLocationChanged = () => ({
    type: SET_LOCATION_CHANGED as typeof SET_LOCATION_CHANGED,
    locationChanged: true
});

export type SetLocationChanged = ReturnType<typeof setLocationChanged>;
