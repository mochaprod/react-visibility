import React from "react";
import PropTypes from "prop-types";

import {
    inViewportWidth as isInViewportWidth,
    inViewportHeight as isInViewportHeight
} from "../util/viewportEvaluators";

import mapStateToCallbacks from "../util/mapStateToCallbacks";

/* eslint react/no-unused-prop-types: off */

class InView extends React.Component {
    static propTypes = {
        children: PropTypes.func.isRequired,

        // Called when the ref'd DOM node enters the viewport
        // ...or, a state change of `inView` from `false` -> `true`
        onViewEnter: PropTypes.func,

        // Called when the ref'd DOM node leaves the viewport
        // ...or, a state change of `inView` from `true` -> `false`
        onViewExit: PropTypes.func,

        // Called when the ref'd DOM node enteres the viewport for the
        // first time.
        onFirstViewEnter: PropTypes.func,

        onViewFullyEnter: PropTypes.func,

        // The element to actively monitor for changes such as scroll
        // event. When the event is fired, a re-calculation of the tracked
        // element's position in the DOM is made and `state` is updated
        // accordingly.
        activeElement: PropTypes.instanceOf(Element),

        // The event to bind to `props.activeElement`.
        event: PropTypes.string,

        exposeState: PropTypes.func
    };

    static defaultProps = {
        onViewEnter: null,
        onViewExit: null,
        onFirstViewEnter: null,
        onViewFullyEnter: null,
        activeElement: window,
        event: "scroll",
        exposeState: null
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
        } = isInViewportHeight(trackedElement);
        const {
            inView: inWidth,
            completelyInView: inWidthFully
        } = isInViewportWidth(trackedElement);

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

        // `enteredView` will stay `true` after being `false`.
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
            this.setState(prevState => {
                // Capture the previous state so that `state`s can be
                // diff'd outside `<InView>`.
                this.inViewPrevState = {
                    ...prevState
                };

                return {
                    inView: nextInView,
                    inViewportHeight: inHeight,
                    inViewportWidth: inWidth,
                    fullyInView: nextCompletelyInView,
                    fullyInViewportHeight: inHeightFully,
                    fullyInViewportWidth: inWidthFully,
                    enteredView: nextEnteredView
                };
            });
        }
    };

    componentDidMount() {
        const { activeElement, event } = this.props;

        if (!this.trackingThis) {
            throw new Error("<InView> mounted without a ref to a DOM element.");
        }

        if (activeElement && activeElement.addEventListener) {
            this.activeListener = true;

            activeElement.addEventListener(event, this.track);
        }

        // Populate initial state on mount.
        this.recalculate();
    }

    componentDidUpdate(prevProps, prevState) {
        // Diffs old `state` with new `state` and calls
        // any appropriate callbacks.

        const stateToCallback = mapStateToCallbacks(this.props);
        let callback;

        Object.keys(this.state).forEach(state => {
            callback = stateToCallback[state];

            if (callback) {
                callback(prevState[state], this.state[state]);
            }
        });

        // Expose the current state to upper components
        const { exposeState } = this.props;

        // Make sure that the `state` has actually changed
        if (typeof exposeState === "function" && this.state !== prevState) {
            exposeState(this.state);
        }
    }

    componentWillUnmount() {
        if (this.activeListener) {
            const { activeElement, event } = this.props;

            activeElement.removeEventListener(event, this.track);
        }
    }

    render() {
        const { children } = this.props;

        return children({
            ref: this.createTracker,
            ...this.state
        }, this.inViewPrevState);
    }
}

export default InView;
