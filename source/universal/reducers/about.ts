import {
    AboutAction,
    FETCH_DESCRIPTION_FAILURE,
    FETCH_DESCRIPTION_REQUEST,
    FETCH_DESCRIPTION_SUCCESS
} from "../actions";

export type AboutState = ReturnType<typeof initialAboutState>;

const initialAboutState = () => ({
    description: "",
    receivedAt: 0,
    isLoading: false
});

export default function about(state = initialAboutState(), action: AboutAction): AboutState {
    switch (action.type) {
        case FETCH_DESCRIPTION_REQUEST:
            return {
                ...state,
                isLoading: action.isLoading
            };
        case FETCH_DESCRIPTION_SUCCESS:
            return {
                ...state,
                isLoading: action.isLoading,
                receivedAt: action.receivedAt,
                description: action.description
            };
        case FETCH_DESCRIPTION_FAILURE:
            return {
                ...state,
                isLoading: action.isLoading
            };
        default:
            return state;
    }
}
