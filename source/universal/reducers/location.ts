import { LocationAction, SET_LOCATION_CHANGED } from "../actions";

export type LocationState = ReturnType<typeof initialLocationState>;

const initialLocationState = () => ({
    locationChanged: false
});

export default function location(
    state = initialLocationState(),
    action: LocationAction
): LocationState {
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
