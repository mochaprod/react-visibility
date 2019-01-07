const __DEV__ = process.env.NODE_ENV !== "production";

const DOCUMENT_ELEMENT = document.documentElement;

const canUseDOM = !!(
    window
    && window.document
    && Element
    && window.requestAnimationFrame
);

/**
 *
 * @param {function} callback a callback function
 */
function createDOMGuard(callback) {
}

export {
    __DEV__,
    canUseDOM,
    DOCUMENT_ELEMENT
};
