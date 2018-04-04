import { ILocationState } from "../models";
import { LocationAction } from "../actions";

const initialAboutState: ILocationState = {
    locationChanged: false
};

export default function location(state = initialAboutState, action: LocationAction) {
    switch (action.type) {
        case "SET_LOCATION_CHANGED":
            return {
                ...state,
                locationChanged: action.locationChanged
            };
        default:
            return state;
    }
}