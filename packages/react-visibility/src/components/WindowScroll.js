import React from "react";
import PropTypes from "prop-types";

import { canUseDOM } from "../util/env";

/**
 * Synchronizes `window`'s scroll properties with React `state`.
 */
class WindowScroll extends React.Component {
    static propTypes = {
        children: PropTypes.func.isRequired
    };

    state = {
        scrollX: canUseDOM
            ? window.scrollX
            : 0,
        scrollY: canUseDOM
            ? window.scrollY
            : 0
    };

    scroll = () =>
        this.setState({
            scrollX: window.scrollX,
            scrollY: window.scrollY
        });

    componentDidMount() {
        if (canUseDOM) {
            document.addEventListener("scroll", this.scroll);
        }
    }

    componentWillUnmount() {
        if (canUseDOM) {
            document.removeEventListener("scroll", this.scroll);
        }
    }

    render() {
        const { children } = this.props;
        return children({ ...this.state });
    }
}

export default WindowScroll;
