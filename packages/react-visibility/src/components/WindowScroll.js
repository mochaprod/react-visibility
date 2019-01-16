import React from "react";
import PropTypes from "prop-types";

import { canUseDOM, DOCUMENT_ELEMENT } from "../util/env";
import { pollScrollingState } from "../util/container";

/**
 * Synchronizes `window`'s scroll properties with React `state`.
 */
class WindowScroll extends React.Component {
    static propTypes = {
        children: PropTypes.func.isRequired
    };

    state = pollScrollingState(DOCUMENT_ELEMENT);

    scroll = () => this.setState(pollScrollingState(DOCUMENT_ELEMENT));

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
