import React from "react";
import PropTypes from "prop-types";

import { canUseDOM } from "../../util/env";
import { getEventTarget, pollScrollingState } from "../../util/container";

/* eslint react/destructuring-assignment:off */

class ScrollingState extends React.Component {
    static propTypes = {
        children: PropTypes.func.isRequired,
        event: PropTypes.oneOfType([
            PropTypes.string,
            PropTypes.arrayOf(PropTypes.string)
        ]),
        container: canUseDOM
            ? PropTypes.oneOfType([
                PropTypes.instanceOf(Element),
                PropTypes.oneOf([document])
            ])
            : PropTypes.any
    };

    static defaultProps = {
        event: "scroll",
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

    update = () => {
        if (this.active) {
            window.cancelAnimationFrame(this.scroll);
        }

        window.requestAnimationFrame(this.scroll);
    };

    componentDidMount() {
        if (canUseDOM) {
            const { event, container } = this.props;

            container.addEventListener(event, this.update);
        }
    }

    componentWillUnmount() {
        if (canUseDOM) {
            const { event, container } = this.props;

            container.removeEventListener(event, this.update);
        }
    }

    render() {
        const { children } = this.props;

        return children({ ...this.state });
    }
}

export default ScrollingState;
