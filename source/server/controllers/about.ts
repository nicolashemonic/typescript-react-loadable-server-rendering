import { Request, Response } from "express";
import { buildAbout } from "../builders";

const externalApiMock = () => {
    return new Promise<string>(resolve => {
        const description =
            "React Server Side Rendering and Code Splitting with TypeScript </script><script>alert('XSS')</script>";
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
