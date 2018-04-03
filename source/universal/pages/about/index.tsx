import React from "react";
import { LoadableDescription } from "../../loadable/components";
import { Link } from "react-router-dom";

export default class About extends React.Component<undefined, { visible: boolean }> {
    constructor(props) {
        super(props);
        this.state = {
            visible: false
        };
    }

    toggle = () => {
        this.setState({
            visible: !this.state.visible
        });
    };

    render() {
        return (
            <div>
                <h1>About</h1>
                <Link to="/">To Home</Link>
                <p>
                    <button onClick={this.toggle}>Toggle Description</button>
                </p>
                {this.state.visible && <LoadableDescription />}
            </div>
        );
    }
}
