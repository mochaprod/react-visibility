import React from "react";
import { func, string } from "prop-types";

import spy from "./spy";
import Store from "../../util/Store";

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

    attachContainer = ref => {
        this.container = ref;
    };

    attachRef = id => {
        if (!id
            || (typeof id !== "string"
            && typeof id !== "number")) {
            throw new Error(`The 'id' of a ref must be a string or a number. It is a ${typeof id}`);
        }

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
