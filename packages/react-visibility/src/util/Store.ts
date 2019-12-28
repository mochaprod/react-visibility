import { warn } from "./env";

const noop = () => {};

export type StoreObserver<S> = (
    prevState: S | null, currentState: S | null
) => void;

/**
 * A very minimal store that notifies observers of
 * state changes.
 */
class Store<S> {
    public static warnInactive(instance: Store<any>) {
        warn(instance.active, "Store deallocated!");

        return false;
    }

    private state: S;
    private observers: Array<StoreObserver<S>>;
    private active: boolean;

    constructor(initialState: S) {
        this.state = initialState;
        this.observers = [];
        this.active = true;
    }

    public deallocate() {
        if (Store.warnInactive(this)) {
            return;
        }

        this.observers = [];
        this.active = false;
    }

    public updateState(nextState: ((prevState: S) => S) | S) {
        if (Store.warnInactive(this)) {
            return;
        }

        // Ensure that `nextState !== this.state`?
        const prevState = this.state;

        if (typeof nextState === "function") {
            // Pass prev state
            const callable = nextState as (prevState: S) => S;
            this.state = callable(this.state);
        } else {
            this.state = nextState;
        }

        // Notify all observers about the state change.
        this.observers.forEach((observer) => observer(prevState, this.state));
    }

    public listen(callback: StoreObserver<S>) {
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
            this.observers = this.observers.filter((fn) => fn !== callback);
        };
    }

    public getState() {
        return this.state;
    }
}

export default Store;
