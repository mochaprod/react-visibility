import React from "react";
import PropTypes from "prop-types";

import Style from "./Status.scss";

class Status extends React.Component {
    static propTypes = {};

    static defaultProps = {};

    state = {
        inView: false
    };

    render() {
        return (
            <aside className={Style["status-box"]}>
                <ul className={Style.list}>
                    {
                        Object.keys(this.state).map(key => (
                            <li>{`${key}: ${this.state[key]}`}</li>
                        ))
                    }
                </ul>
            </aside>
        );
    }
}

export default Status;
