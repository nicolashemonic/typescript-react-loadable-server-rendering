import { ApiAction, SET_API_URLS } from "../actions/api";
import { IApi } from "../models";

const initialApiState = (): IApi => ({
    aboutUrl: ""
});

export default function api(state = initialApiState(), action: ApiAction): IApi {
    switch (action.type) {
        case SET_API_URLS:
            return {
                ...state,
                aboutUrl: action.aboutUrl
            };
        default:
            return state;
    }
}
