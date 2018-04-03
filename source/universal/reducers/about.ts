import { AboutAction } from "../actions";

const initialAboutState = {
    visibleDescription: false,
    description: "",
    receivedAt: 0,
    isLoading: false
};

export default function about(state = initialAboutState, action: AboutAction) {
    switch (action.type) {
        case "TOGGLE_DESCRIPTION_VISIBLITY":
            return {
                ...state,
                visibleDescription: !state.visibleDescription
            };
        case "FETCH_DESCRIPTION_REQUEST":
            return {
                ...state,
                isLoading: true
            };
        case "FETCH_DESCRIPTION_SUCCESS":
            return {
                ...state,
                isLoading: false,
                receivedAt: action.receivedAt,
                description: action.description
            };
        case "FETCH_DESCRIPTION_FAILURE":
            return {
                ...state,
                isLoading: false
            };
        default:
            return state;
    }
}
