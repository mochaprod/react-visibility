import { getElementRect } from "../../util/container";

// Contains functions that interface with the `ScrollSpy`
// component.

/**
 * @param {HTMLElement[]} elements
 * @param {*} container
 */
function getScrollDistances(elements, container) {
    const distances = elements
        .map(({ id, ref }) => {
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
                width: left + width,
                height: top + height
            };
        });

    return distances;
}

function spy(elements, container = window, height = true) {
    if (!elements) {
        return null;
    }

    const distances = getScrollDistances(elements, container);
    const property = height ? "height" : "width";

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

    return notScrolled[0];
}

export default spy;
