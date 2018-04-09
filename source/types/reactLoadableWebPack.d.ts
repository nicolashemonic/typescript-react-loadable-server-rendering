declare module "react-loadable/webpack" {
    export const getBundles: (stats: string, modules: string[]) => IReactLoadableWebpackBundle[];

    export interface IReactLoadableWebpackBundle {
        id: string;
        name: string;
        file: string;
    }
}
