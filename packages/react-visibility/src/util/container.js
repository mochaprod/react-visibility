import { canUseDOM, DOCUMENT_ELEMENT } from "./env";

// If `container === window`, then use `window.pageYOffset`
// otherwise, use `container.scrollTop`.
// If `window`, use `window.innerHeight`; or use
// `container.offsetHeight`.
// If `window` use `DOC.body.scrollHeight`,
// `DOC.documentElement.scrollHeight`; or use `container.scrollHeight`.

// If `window`, use `getBoundingClientRect()`; or use
// custom `offsetParent` method like `gBCR()`.

function getEventTarget(element) {
    return element.documentElement || element;
}

/**
 * Computes the height and width of the content of an element
 * that excludes scrollbars and borders.
 * Uses the `clientWidth` and `clientHeight` dimensions.
 *
 * @param {window | HTMLElement} element obtain dimensions from
 * @param {boolean} total `true` to use offset dimensions
 */
function pollClientDimensions(element = window, total = false) {
    if (element === window) {
        return {
            width: window.innerWidth,
            height: window.innerHeight
        };
    }

    // Includes element height and padding, no borders/margins!
    const {
        clientWidth,
        clientHeight,
        offsetWidth,
        offsetHeight
    } = element;

    return {
        width: total
            ? offsetWidth
            : clientWidth,
        height: total
            ? offsetHeight
            : clientHeight
    };
}

/**
 * Computes the scrolling properties of an element.
 * Includes:
 *  * `scrollTop` - total height scrolled
 *  * `scrollLeft` - total width scrolled
 *  * `scrollWidth` - total available width to scroll
 *  * `scrollHeight` - total available height to scroll
 *
 * @param {*} element
 */
function pollContainerScrollProperties(element = window) {
    if (element === window) {
        // `window` can scroll across the entire `document`

        return {
            scrollTop: window.pageYOffset,
            scrollLeft: window.pageXOffset,
            scrollWidth: Math.max(
                document.body.scrollWidth,
                DOCUMENT_ELEMENT.scrollWidth
            ),
            scrollHeight: Math.max(
                document.body.scrollHeight,
                DOCUMENT_ELEMENT.scrollWidth
            )
        };
    }

    const {
        scrollTop,
        scrollLeft,
        scrollWidth,
        scrollHeight
    } = element;

    return {
        scrollTop,
        scrollLeft,
        scrollWidth,
        scrollHeight
    };
}

function pollScrollingState(element = window) {
    if (!canUseDOM) {
        return null;
    }

    const {
        width,
        height
    } = pollClientDimensions(element);
    const {
        scrollWidth,
        scrollHeight,
        scrollLeft,
        scrollTop
    } = pollContainerScrollProperties(element);

    const didScrollToWidthEnd = scrollLeft + width === scrollWidth;
    const didScrollToHeightEnd = scrollTop + height === scrollHeight;

    return {
        containerWidth: width,
        containerHeight: height,
        scrollTop,
        scrollLeft,
        widthEnd: didScrollToWidthEnd,
        heightEnd: didScrollToHeightEnd
    };
}

/**
 * Computes the 'bounding client rect' for any element relative
 * to its `offsetParent` container. If the container is `window`,
 * then simply `gBCR()` is used.
 *
 * This function requires any container other than the `document`
 * to have CSS `position: relative` and `overflow: scroll`. Ensure
 * that there is also a fixed height.
 *
 * @param {Element | HTMLElement} element an element
 * @param {Window | Element} container a container element
 */
function getElementRect(element, container = window) {
    // `offsetWidth` and `offsetHeight` give the full width and height
    // including scrollbars.
    if (container === window) {
        return element.getBoundingClientRect();
    }

    const {
        offsetTop,
        offsetLeft,
        offsetWidth,
        offsetHeight,
        offsetParent: parent
    } = element;

    const {
        scrollTop,
        scrollLeft
    } = pollContainerScrollProperties(container);

    const {
        width: parentWidth,
        height: parentHeight
    } = pollClientDimensions(parent);

    const top = offsetTop - scrollTop;
    const left = offsetLeft - scrollLeft;
    const bottom = parentHeight - top - offsetHeight;
    const right = parentWidth - left - offsetWidth;

    const result = {
        width: offsetWidth,
        height: offsetHeight,
        top,
        left,
        bottom,
        right
    };

    return result;
}

/**
 * Computes how far an element is from the very top of its
 * `offsetParent`. If the container is `window` that would be
 * how far the element from the top of the `document`.
 *
 * @param {HTMLElement} element
 * @param {Window | HTMLElement} container
 */
function getScrollDistance(element, container = window) {
}

export {
    getEventTarget,
    pollClientDimensions,
    pollContainerScrollProperties,
    pollScrollingState,
    getElementRect
};
