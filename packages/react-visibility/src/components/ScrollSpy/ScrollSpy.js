import React from "react";
import { number, func, string } from "prop-types";

import spy from "./spy";
import Store from "../../util/Store";
import {
    warn, assert, noop
} from "../../util/env";

class ScrollSpy extends React.Component {
    static propTypes = {
        children: func.isRequired,
        scroll: string,
        offset: number,
        onChange: func
    };

    static defaultProps = {
        scroll: "height",
        offset: 0,
        onChange: noop
    };

    state = {
        active: null,
        element: null
    };

    // The store holds the elements that being watched by
    // the scroll-spy code.
    store = new Store([]);

    _getContainer = () => this.container || window;

    _ensureScrollComponentsExist = () => {
        const { store } = this;

        warn(
            store.state.length,
            "<ScrollSpy> mounted without any scroll-sensitive components (scroll children). Ensure that scroll children receive the 'attachRef' prop."
        );
    };

    /**
     * Returns a function that when called, the `onChange` prop is called
     * as a function. If an argument is provided, it is also called.
     */
    _callOnChange = () => {
        const { onChange } = this.props;
        const { active: currentActive, element } = this.state;

        if (typeof onChange === "function") {
            onChange(currentActive, element);
        }
    };

    attachContainer = ref => {
        this.container = ref;
    };

    /**
     * Used on DOM components to attach them to `<ScrollSpy>`.
     * Usage:
     *  <div
     *      ref={ attachRef("unique_id") }
     *  />
     */
    attachRef = id => {
        assert(
            typeof id === "string"
            || typeof id === "number",
            `The 'id' argument called on 'attachRef' must be a string or a number. Received a '${typeof id}'.`,
            true
        );

        return innerRef => {
            const { store } = this;

            if (store === null) {
                // The component unmounted, ignore this function call.

                return;
            }

            // If `innerRef` already exists, ignore the function call.
            if (store.state.find(({ ref }) => ref === innerRef)) {
                return;
            }

            this.store.updateState(prevState => {
                // Filter out DOM refs that have been unmounted by React.
                const nextState = prevState.filter(({ ref }) => ref.parentNode);

                if (innerRef === null) {
                    return nextState;
                }

                return [
                    ...nextState,
                    {
                        id,
                        ref: innerRef
                    }
                ];
            });
        };
    };

    calculate = () => {
        if (!this.store.state.length) {
            return;
        }

        const { scroll, offset } = this.props;
        const { active } = this.state;

        const { id, element } = spy(
            this.store.state,
            this._getContainer(),
            scroll === "height",
            offset
        );

        if (active === id) {
            // Don't update `state` if the active element
            // didn't change.

            return;
        }

        this.setState(
            {
                active: id,
                element
            },
            this._callOnChange
        );
    };

    start = () => {
        if (this.scrolling) {
            window.cancelAnimationFrame(this.scrolling);
        }

        this.scrolling = window.requestAnimationFrame(this.calculate);
    };

    componentDidMount() {
        // Ensure the component actually has elements to track!
        this._ensureScrollComponentsExist();

        // Bootstrap scrolling
        this.start();
        this._getContainer().addEventListener("scroll", this.start);
    }

    componentWillUnmount() {
        // Proper clean up.
        this.store.deallocate();
        this.store = null;

        this._getContainer().removeEventListener("scroll", this.start);
    }

    render() {
        const { children } = this.props;
        const { active } = this.state;

        return children({
            spyRef: this.attachContainer,
            attachRef: this.attachRef,
            active
        });
    }
}

export default ScrollSpy;
