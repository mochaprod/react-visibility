const __DEV__ = process.env.NODE_ENV !== "production";

const DOCUMENT_ELEMENT = document.documentElement;

const canUseDOM = !!(
    window
    && window.document
    && Element
    && window.requestAnimationFrame
);

function noop() {
    // Noop
}

function warn(test, message) {
    if (__DEV__ && !test) {
        console.warn(message);
    }
}

function assert(test, message, force = false) {
    if ((__DEV__ || force) && !test) {
        throw new Error(message);
    }
}

export {
    __DEV__,
    canUseDOM,
    DOCUMENT_ELEMENT,
    noop,
    warn,
    assert
};
