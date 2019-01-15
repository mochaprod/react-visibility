import React from "react";
import { func, string } from "prop-types";

import spy from "./spy";
import Store from "../../util/Store";
import { warn, assert } from "../../util/env";

// TODO:
// * server-side rendering
// * add callback functions?

class ScrollSpy extends React.Component {
    static propTypes = {
        children: func.isRequired,
        scroll: string
    };

    static defaultProps = {
        scroll: "height"
    };

    state = {
        active: null
    };

    // The store holds the elements that being watched by
    // the scroll-spy code.
    store = new Store([]);

    getContainer = () => this.container || window;

    ensureScrollComponentsExist = () => {
        const { store } = this;

        warn(
            store.state.length,
            "<ScrollSpy> mounted without any scroll-sensitive components (scroll children). Ensure that scroll children receive the 'attachRef' prop."
        );
    };

    attachContainer = ref => {
        this.container = ref;
    };

    attachRef = id => {
        assert(
            id
            && (typeof id !== "string"
            || typeof id !== "number"),
            `The 'id' argument called on 'attachRef' must be a string or a number. Received a '${typeof id}'.`,
            true
        );

        return innerRef => {
            this.store.updateState(prevState => {
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

        const { scroll } = this.props;
        const { active } = this.state;

        const { id } = spy(
            this.store.state,
            this.getContainer(),
            scroll === "height"
        );

        if (active === id) {
            // Don't update `state` if the active element
            // didn't change.

            return;
        }

        this.setState({
            active: id
        });
    };

    start = () => {
        if (this.scrolling) {
            window.cancelAnimationFrame(this.scrolling);
        }

        this.scrolling = window.requestAnimationFrame(this.calculate);
    };

    componentDidMount() {
        // Ensure the component actually has elements to track!
        this.ensureScrollComponentsExist();

        // Let's go!
        this.start();
        this.getContainer().addEventListener("scroll", this.start);
    }

    componentWillUnmount() {
        // Proper clean up.
        this.store.deallocate();
        this.store = null;

        this.getContainer().removeEventListener("scroll", this.start);
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
