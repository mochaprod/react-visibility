import { viewportHeight, viewportWidth } from "./viewport";
import { getElementRect } from "./container";

/**
 * Factory for a function that evaluates a DOM element's position
 * in the viewport.
 */
const createViewportEvaluator = (
    viewportDimension,
    upperValue,
    lowerValue
) => (
    element,
    offsets = {
        upper: 0,
        lower: 0
    },
    container
) => {
    if (!element) {
        return false;
    }

    const { upper: up, lower: low } = offsets;
    const rect = getElementRect(element, container);
    const upper = rect[upperValue] - up;
    const lower = rect[lowerValue] + low;
    const latestViewportDimension = viewportDimension(container);

    const inView = (upper >= 0 || lower >= 0)
        && (upper < latestViewportDimension || lower < latestViewportDimension);
    const completelyInView = upper >= 0 && lower >= 0
        && upper < latestViewportDimension && lower < latestViewportDimension;

    return {
        inView,
        completelyInView
    };
};

const inViewportHeight = createViewportEvaluator(
    viewportHeight,
    "top",
    "bottom"
);

const inViewportWidth = createViewportEvaluator(
    viewportWidth,
    "left",
    "right"
);

export { inViewportHeight, inViewportWidth };
