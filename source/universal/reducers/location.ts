import { LocationAction, SET_LOCATION_CHANGED } from "../actions";
import { ILocationState } from "../models";

const initialLocationState = (): ILocationState => ({
    locationChanged: false
});

export default function location(
    state = initialLocationState(),
    action: LocationAction
): ILocationState {
    switch (action.type) {
        case SET_LOCATION_CHANGED:
            return {
                ...state,
                locationChanged: action.locationChanged
            };
        default:
            return state;
    }
}
