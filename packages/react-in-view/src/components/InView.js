import React from "react";
import PropTypes from "prop-types";

import { inViewportWidth, inViewportHeight } from "../util/viewportEvaluators";

class InView extends React.Component {
    static propTypes = {
        children: PropTypes.func.isRequired,

        // Called when the ref'd DOM node enters the viewport
        // ...or, a state change of `inView` from `false` -> `true`
        onViewEnter: PropTypes.func,

        // Called when the ref'd DOM node leaves the viewport
        // ...or, a state change of `inView` from `true` -> `false`
        onViewExit: PropTypes.func,

        // The element to actively monitor for changes such as scroll
        // event. When the event is fired, a re-calculation of the tracked
        // element's position in the DOM is made and `state` is updated
        // accordingly.
        activeElement: PropTypes.instanceOf(Element),

        // The event to bind to `props.activeElement`.
        event: PropTypes.string
    };

    static defaultProps = {
        activeElement: window,
        event: "string"
    };

    state = {
        // `true` if the ref'd element is currently in the viewport after the
        // last scroll event.
        inView: false,

        inViewportWidth: false,

        inViewportHeight: false,

        fullyInView: false,

        fullyInViewportWidth: false,

        fullyInViewportHeight: false,

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

    track = () =>
        requestAnimationFrame(this.recalculate);

    /**
     * Diffs old DOM element state with the current after `scroll` event
     * is fired.
     */
    recalculate = () => {
        if (!this.trackingThis) {
            return;
        }

        /**
         * @type {Element}
         */
        const trackedElement = this.trackingThis;
        const {
            inView: inHeight,
            completelyInView: inHeightFully
        } = inViewportHeight(trackedElement);
        const {
            inView: inWidth,
            completelyInView: inWidthFully
        } = inViewportWidth(trackedElement);

        const nextInView = inHeight && inWidth;
        const nextCompletelyInView = inHeightFully && inWidthFully;
        const {
            inView,
            inViewportHeight,
            inViewportWidth,
            fullyInView,
            fullyInViewportHeight,
            fullyInViewportWidth,
            enteredView
        } = this.state;

        const nextEnteredView = nextInView || enteredView;

        const needsUpdating =
            nextInView !== inView ||
            inHeight !== inViewportHeight ||
            inWidth !== inViewportWidth ||
            nextCompletelyInView !== fullyInView ||
            inHeightFully !== fullyInViewportHeight ||
            inWidthFully !== fullyInViewportWidth ||
            nextEnteredView !== enteredView;

        if (needsUpdating) {
            this.setState({
                inView: nextInView,
                inViewportHeight: inHeight,
                inViewportWidth: inWidth,
                fullyInView: nextCompletelyInView,
                fullyInViewportHeight: inHeightFully,
                fullyInViewportWidth: inWidthFully,
                enteredView: nextEnteredView
            });
        }
    };

    componentDidMount() {
        if (activeElement && activeElement.addEventListener) {
            const { activeElement, event } = this.props;
            this.activeListener = true;

            activeElement.addEventListener(event, this.track);
        }
    }

    componentDidUpdate() {
        // Diffs old `state` with new `state` and calls
        // any appropriate callbacks.
    }

    componentWillUnmount() {
        if (this.activeListener) {
            const { activeElement, event } = this.props;

            activeElement.removeEventListener(event, this.track);
        }
    }

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
