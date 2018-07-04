import React from "react";
import PropTypes from "prop-types";

class InView extends React.Component {
    static propTypes = {
        children: PropTypes.func.isRequired,
        onViewEnter: PropTypes.func,
        onViewExit: PropTypes.func
    };

    static defaultProps = {};

    state = {
        // `true` if the ref'd element is currently in the viewport after the
        // last scroll event.
        inView: false,

        // `true` if the ref'd element has entered the view at some point
        // during the session.
        enteredView: false
    };

    /**
     * A ref that is passed to the DOM node to be tracked.
     */
    createTracker = element => {
        this.trackingThis = element;
    };

    render() {
        const { children } = this.props;
        const { inView, enteredView } = this.state;

        return children({
            ref: this.createTracker,
            inView,
            enteredView
        });
    }
}

export default InView;
