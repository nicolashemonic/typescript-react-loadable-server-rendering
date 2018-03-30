import React from "react";
import Loadable from "react-loadable";
import Loading from "../loading";

const OnDemand = Loadable({
    loader: () => import(/* webpackChunkName: "onDemand" */ "../onDemand"),
    loading: Loading
});

export default class Hello extends React.Component<undefined, { visible: boolean }> {
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
                <h1>Hello from a loadable component</h1>
                <button onClick={this.toggle}>Click me</button>
                {this.state.visible && <OnDemand />}
            </div>
        );
    }
}
