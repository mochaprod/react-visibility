import React from "react";
import PropTypes from "prop-types";

import { canUseDOM } from "../../util/env";
import PoolerContext from "./Context";

class EventProvider extends React.Component {
    static propTypes = {
        children: PropTypes.element.isRequired
    };

    state = {
        subscriptions: []
    };

    /**
     * Subscribes an listener function so that it is called when a DOM even is triggered.
     *
     * @returns {Promise} a `Promise` that resolves into a function that when called,
     * unsubscribes the function.
     */
    subscribe = listener => {
        const { subscriptions } = this.state;

        const unsubscribe = new Promise(resolve => {
            if (!subscriptions.find(listener) &&
                typeof sub === "function") {
                this.setState(({ subscriptions: subs }) => ({
                    subscriptions: [...subs, listener]
                }), () => resolve(this.unsubscribe(listener)));
            } else {
                resolve();
            }
        });

        return unsubscribe;
    };

    unsubscribe = listener => {
        let called = false;

        return () => {
            if (called) {
                return;
            }

            this.setState(({ subscriptions: subs }) => ({
                subscriptions: subs.filter(subscription =>
                    subscription !== listener)
            }), () => {
                called = true;
            });
        };
    };

    notify = () => {
        const { subscriptions } = this.state;

        subscriptions.forEach(subscription => subscription());
    };

    componentDidMount() {
        if (canUseDOM) {
            document.addEventListener("scroll", this.notify);
        }
    }

    render() {
        const { children } = this.props;

        return (
            <PoolerContext.Provider value={ this.subscribe }>
                { children }
            </PoolerContext.Provider>
        );
    }
}

export default EventProvider;
