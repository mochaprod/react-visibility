import React from "react";
import {
    any, func, oneOf, oneOfType, instanceOf
} from "prop-types";

import { canUseDOM } from "../../util/env";
import { getEventTarget, pollScrollingState } from "../../util/container";

/* eslint react/destructuring-assignment:off */

class ScrollingState extends React.Component {
    static propTypes = {
        children: func.isRequired,
        container: canUseDOM
            ? oneOfType([
                instanceOf(Element),
                oneOf([document])
            ])
            : any
    };

    static defaultProps = {
        container: document
    };

    state = canUseDOM
        ? pollScrollingState(getEventTarget(this.props.container))
        : {};

    scroll = () => {
        const { container } = this.props;

        this.setState(
            pollScrollingState(getEventTarget(container))
        );
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
