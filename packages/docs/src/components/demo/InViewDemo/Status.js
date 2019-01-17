import React from "react";
import PropTypes from "prop-types";

import Style from "./Status.scss";

class Status extends React.Component {
    static propTypes = {};

    static defaultProps = {};

    render() {
        return (
            <aside className={Style["status-box"]}>
                <h2 className={Style.heading}>
                    <code>InView's state</code>
                </h2>
                <ul className={Style.list}>
                    {
                        Object.keys(this.props).map(key => (
                            <li
                                key={key}
                                className={Style["list-item"]}>
                                <span>
                                    {`${key}:`}
                                </span>
                                <span
                                    style={{
                                        color: !this.props[key] ?
                                            "#ff6d6d" :
                                            "#189b3f"
                                    }}>
                                    {`${this.props[key]}`}
                                </span>
                            </li>
                        ))
                    }
                </ul>
            </aside>
        );
    }
}

export default Status;
