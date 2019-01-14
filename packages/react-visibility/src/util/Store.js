const noop = () => {};

/**
 * A very minimal store that notifies observers of
 * state changes.
 */
class Store {
    static warnInactive(instance) {
        if (!instance.active) {
            console.warn("Access to the store was blocked; it has been deallocated.");

            return true;
        }

        return false;
    }

    constructor(initialState = null) {
        this.state = initialState;
        this.observers = [];
        this.active = true;
    }

    deallocate() {
        if (Store.warnInactive(this)) {
            return;
        }

        this.state = null;
        this.observers = null;
        this.active = false;
    }

    updateState(nextState = {}) {
        if (Store.warnInactive(this)) {
            return;
        }

        // Ensure that `nextState !== this.state`?

        const prevState = this.state;
        let next = nextState;

        if (typeof nextState === "function") {
            // Pass prev state
            next = nextState(this.state);
        }

        this.state = next;

        // Notify all observers about the state change.
        this.observers.forEach(observer => observer(prevState, this.state));
    }

    listen(callback = noop) {
        if (Store.warnInactive(this)) {
            // Return a noop so that a function call in an inactive
            // instance won't throw an error.

            return noop;
        }

        this.observers = [
            ...this.observers,
            callback
        ];

        // Function to remove the callback function.
        return () => {
            this.observers = this.observers.filter(fn => fn !== callback);
        };
    }
}

export default Store;
