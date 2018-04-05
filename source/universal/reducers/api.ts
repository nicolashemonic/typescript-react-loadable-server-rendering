import { ApiAction, SET_API_URLS } from "../actions/api";

export type ApiState = ReturnType<typeof initialApiState>;

const initialApiState = () => ({
    descriptionUrl: ""
});

export default function api(state = initialApiState(), action: ApiAction): ApiState {
    switch (action.type) {
        case SET_API_URLS:
            return {
                ...state,
                descriptionUrl: action.descriptionUrl
            };
        default:
            return state;
    }
}
