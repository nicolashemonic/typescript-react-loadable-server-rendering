export interface IAboutState extends IAbout {
    readonly receivedAt: number;
    readonly isLoading: boolean;
}

export interface IAbout {
    readonly description: string;
}
