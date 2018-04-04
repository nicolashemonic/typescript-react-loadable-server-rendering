import { AboutAction } from "../actions";
import { IAboutState } from "../models";

const initialAboutState: IAboutState = {
    description: "",
    receivedAt: 0,
    isLoading: false
};

export default function about(state = initialAboutState, action: AboutAction) {
    switch (action.type) {
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
