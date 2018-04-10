import { Request, Response } from "express";
import { buildAbout } from "../builders";

const externalApiMock = () => {
    return new Promise<string>(resolve => {
        const description = "React code splitting plus server rendering using TypeScript.";
        setTimeout(() => resolve(description), 1000);
    });
};

export default async function aboutController(req: Request, res: Response) {
    res.setHeader("Content-Type", "application/json");
    try {
        const response = await externalApiMock();
        res.send(JSON.stringify(buildAbout(response)));
    } catch (e) {
        console.log(e);
    }
}
