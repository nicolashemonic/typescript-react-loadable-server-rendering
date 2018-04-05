import { IApi } from "../models";

export type ApiAction = SetApiUrls;

export const SET_API_URLS = "SET_API_URLS";

export const setApiUrls = (api: IApi) => ({
    type: SET_API_URLS as typeof SET_API_URLS,
    descriptionUrl: api.descriptionUrl
});

export type SetApiUrls = ReturnType<typeof setApiUrls>;
