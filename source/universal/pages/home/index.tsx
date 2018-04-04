import React from "react";
import { Link, RouteComponentProps } from "react-router-dom";

interface IHomeProps extends RouteComponentProps<any> {}

export default function Home(props: IHomeProps) {
    return (
        <div>
            <h1>Home</h1>
            <Link to="/about">To About</Link>
        </div>
    );
}
