import { getElementRect, didReachMaxScroll } from "../../util/dom";
import { ContainerElement } from "../../util/env";

export interface SpyElement {
    id: string;
    ref: HTMLElement;
}

export interface SpyDistance {
    id: string;
    element: ContainerElement;
    width: number;
    height: number;
}

export interface SpyOptions {
    container?: ContainerElement;
    dimension: "height" | "width";
    offset?: number;
}

export interface SpyOffsetOptions {
    width: number;
    height: number;
    container?: ContainerElement;
}

// Contains functions that interface with the `ScrollSpy`
// component.

/**
 * Computes the distance the bottom/left edge of an element to the
 * top/left edge of the viewport or a container element.
 *
 * Computes the distances for an array of elements.
 */
function getScrollDistances(
    elements: SpyElement[],
    options: SpyOffsetOptions
) {
    const {
        container,
        width: widthOffset,
        height: heightOffset,
    } = options;

    const distances: SpyDistance[] = elements
        .map(({ id, ref }) => {
            // `id` is a string or a number that uniquely identifies
            // an element being tracked.
            // `ref` is a reference to a DOM element given by React.
            const {
                top,
                left,
                width,
                height,
            } = getElementRect(ref, container);

            const elementDistances: SpyDistance = {
                id,
                element: ref,
                width: left + width + widthOffset,
                height: top + height + heightOffset
            };

            return elementDistances;
        });

    return distances;
}

/**
 * Determines the active element among an array of `element`s.
 *
 * @param {HTMLElement[]} elements
 * @param {boolean} height
 */
function spy(
    elements: SpyElement[],
    options: SpyOptions
) {
    if (!elements || !elements.length) {
        return null;
    }

    const {
        container,
        dimension: property,
        offset,
    } = options;

    const distances = getScrollDistances(
        elements,
        {
            container,
            height: offset || 0,
            width: offset || 0,
        }
    );
    const reachedMaxScroll = didReachMaxScroll(container)[property];

    const ascending = (
        a: SpyDistance,
        b: SpyDistance
    ) => a[property] - b[property];

    // Elements that are not scrolled passed the top of the viewport
    // yet, but could be in view.
    const notScrolled = distances
        .filter((distance) => distance[property] >= 0)
        .sort(ascending);

    // Elements that have scrolled passed the top of the viewport.
    const scrolled = distances
        .filter((distance) => distance[property] < 0)
        .sort(ascending);

    if (!notScrolled.length) {
        return scrolled[scrolled.length - 1];
    }

    if (reachedMaxScroll) {
        return notScrolled[notScrolled.length - 1];
    }

    return notScrolled[0];
}

export default spy;
