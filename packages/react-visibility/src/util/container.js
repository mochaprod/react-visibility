import { canUseDOM, DOCUMENT_ELEMENT } from "./env";

function getEventTarget(element) {
    return element.documentElement || element;
}

function pollClientDimensions(element = DOCUMENT_ELEMENT) {
    // Includes element height and padding, no borders/margins!
    const {
        clientWidth,
        clientHeight
    } = element;

    return {
        width: clientWidth,
        height: clientHeight
    };
}

function pollContainerScrollProperties(element = DOCUMENT_ELEMENT) {
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

function pollScrollingState(element = DOCUMENT_ELEMENT) {
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

export {
    getEventTarget,
    pollClientDimensions,
    pollContainerScrollProperties,
    pollScrollingState
};
