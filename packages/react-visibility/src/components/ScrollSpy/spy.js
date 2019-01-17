import { getElementRect, didReachMaxScroll } from "../../util/container";

// Contains functions that interface with the `ScrollSpy`
// component.

/**
 * Computes the distance the bottom/left edge of an element to the
 * top/left edge of the viewport or a container element.
 *
 * Computes the distances for an array of elements.
 *
 * @param {HTMLElement[]} elements
 * @param {Window | HTMLElement} container
 */
function getScrollDistances(
    elements,
    container,
    widthOffset,
    heightOffset
) {
    const distances = elements
        .map(({ id, ref, callback }) => {
            // `id` is a string or a number that uniquely identifies
            // an element being tracked.
            // `ref` is a reference to a DOM element given by React.
            const {
                top,
                left,
                width,
                height
            } = getElementRect(ref, container);

            return {
                id,
                callback,
                element: ref,
                width: left + width + widthOffset,
                height: top + height + heightOffset
            };
        });

    return distances;
}

/**
 * Determines the active element among an array of `element`s.
 *
 * @param {HTMLElement[]} elements
 * @param {Window | HTMLElement} container
 * @param {boolean} height
 */
function spy(
    elements,
    container = window,
    height = true,
    offset = 0
) {
    if (!elements || !elements.length) {
        return null;
    }

    const property = height ? "height" : "width";
    const distances = getScrollDistances(elements, container, offset, offset);
    const reachedMaxScroll = didReachMaxScroll(container)[property];

    const ascending = (a, b) => a[property] - b[property];

    // Elements that are not scrolled passed the top of the viewport
    // yet, but could be in view.
    const notScrolled = distances
        .filter(distance => distance[property] >= 0)
        .sort(ascending);

    // Elements that have scrolled passed the top of the viewport.
    const scrolled = distances
        .filter(distance => distance[property] < 0)
        .sort(ascending);

    if (!notScrolled) {
        return scrolled[scrolled.length - 1];
    }

    if (reachedMaxScroll) {
        return notScrolled[notScrolled.length - 1];
    }

    return notScrolled[0];
}

export default spy;
