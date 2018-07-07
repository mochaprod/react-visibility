
const safe = (fn, ...args) => {
    if (typeof fn === "function") {
        fn(...args);
    }
};

// Maps state to callbacks
const mapStateToCallbacks = ({
    onViewEnter,
    onViewExit,
    onFirstViewEnter
}) => ({
    inView: (prev, next) => {
        if (!prev && next) {
            safe(onViewEnter);
        } else if (prev && !next) {
            safe(onViewExit);
        }
    },
    enteredView: (prev, next) => {
        if (!prev && next) {
            safe(onFirstViewEnter);
        }
    }
});

export default mapStateToCallbacks;
