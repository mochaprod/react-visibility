import { canUseDOM, DOCUMENT_ELEMENT, ContainerElement } from "./env";

export interface ClientDimensions {
    width: number;
    height: number;
}

export interface ScrollProperties {
    scrollTop: number;
    scrollLeft: number;
    scrollWidth: number;
    scrollHeight: number;
}

// If `container === window`, then use `window.pageYOffset`
// otherwise, use `container.scrollTop`.
// If `window`, use `window.innerHeight`; or use
// `container.offsetHeight`.
// If `window` use `DOC.body.scrollHeight`,
// `DOC.documentElement.scrollHeight`; or use `container.scrollHeight`.

// If `window`, use `getBoundingClientRect()`; or use
// custom `offsetParent` method like `gBCR()`.

function getEventTarget(element: Element & Document) {
    return element.documentElement || element;
}

function windowDimensions() {
    const dims: ClientDimensions = {
        width: window.innerWidth,
        height: window.innerHeight,
    };

    return dims;
}

function elementDimensions(element?: Element | null): ClientDimensions {
    if (!element) {
        return windowDimensions();
    }

    const {
        clientHeight,
        clientWidth,
    } = element;

    return {
        width: clientWidth,
        height: clientHeight,
    };
}

/**
 * Computes the height and width of the content of an element
 * that excludes scrollbars and borders.
 * Uses the `clientWidth` and `clientHeight` dimensions.
 *
 * @param {Window | HTMLElement} element obtain dimensions from
 * @param {boolean} total `true` to use offset dimensions
 */
function pollClientDimensions(
    element?: ContainerElement, total?: boolean
): ClientDimensions {
    if (!element) {
        return windowDimensions();
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

function windowScrollProperties() {
    const props: ScrollProperties = {
        scrollTop: window.pageYOffset,
        scrollLeft: window.pageXOffset,
        scrollWidth: Math.max(
            document.body.scrollWidth,
            DOCUMENT_ELEMENT.scrollWidth
        ),
        scrollHeight: Math.max(
            document.body.scrollHeight,
            DOCUMENT_ELEMENT.scrollHeight
        ),
    };

    return props;
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
function pollContainerScrollProperties(element?: ContainerElement) {
    if (!element) {
        return windowScrollProperties();
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

function pollScrollingState(element: ContainerElement) {
    if (!canUseDOM) {
        return null;
    }

    const {
        width,
        height
    } = pollClientDimensions(element, false);
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
function getElementRect(element: ContainerElement, container?: ContainerElement) {
    // `offsetWidth` and `offsetHeight` give the full width and height
    // including scrollbars.
    if (!container) {
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
    } = elementDimensions(parent);

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

function didReachMaxScroll(container?: ContainerElement) {
    const {
        width,
        height
    } = pollClientDimensions(container, false);

    const {
        scrollLeft,
        scrollTop,
        scrollWidth,
        scrollHeight
    } = pollContainerScrollProperties(container);

    return {
        width: scrollWidth - scrollLeft - width < 1,
        height: scrollHeight - scrollTop - height < 1
    };
}

export {
    getEventTarget,
    pollClientDimensions,
    pollContainerScrollProperties,
    pollScrollingState,
    getElementRect,
    didReachMaxScroll
};
