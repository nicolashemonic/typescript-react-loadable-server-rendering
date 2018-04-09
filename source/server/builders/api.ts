import { IApi } from "../../universal/models";

export const buildApi = (protocol: string, host: string): IApi => ({
    aboutUrl: `${protocol}://${host}/api/about`
});
