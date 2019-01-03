import React from "react";
import { any, func, instanceOf } from "prop-types";

import { canUseDOM, DOCUMENT_ELEMENT } from "../../util/env";
import { pollScrollingState } from "../../util/container";

/* eslint react/destructuring-assignment:off */

class ScrollingState extends React.Component {
    static propTypes = {
        children: func.isRequired,
        container: canUseDOM
            ? instanceOf(Element)
            : any
    };

    static defaultProps = {
        container: DOCUMENT_ELEMENT
    };

    state = canUseDOM
        ? pollScrollingState(this.props.container)
        : {};

    scroll = () => {
        const { container } = this.props;

        this.setState(pollScrollingState(container));
    };

    componentDidMount() {
        if (canUseDOM) {
            const { container } = this.props;

            container.addEventListener("scroll", this.scroll);
        }
    }

    componentWillUnmount() {
        if (canUseDOM) {
            const { container } = this.props;

            container.removeEventListener("scroll", this.scroll);
        }
    }

    render() {
        const { children } = this.props;

        return children({ ...this.state });
    }
}

export default ScrollingState;
