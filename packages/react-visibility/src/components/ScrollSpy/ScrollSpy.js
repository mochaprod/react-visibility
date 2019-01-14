import React from "react";
import { func, string } from "prop-types";

import spy from "./spy";
import Store from "../../util/Store";
import { noop } from "../../util/env";

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

    attachContainer = ref => {
        this.container = ref;
    };

    attachRef = id => {
        if (!id
            || typeof id !== "string"
            || typeof id !== "number") {
            throw new Error("The 'id' of a ref must be a string or a number.");
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

        const active = spy(
            this.store.state,
            this.container || window,
            scroll === "height"
        );

        this.setState({
            active
        });
    };

    componentDidMount() {
        this.calculate();

        this.container.addEventListener("scroll", this.calculate);
    }

    componentWillUnmount() {
        // Proper clean up.
        this.store.deallocate();
        this.store = null;

        this.container.removeEventListener("scroll", this.calculate);
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
