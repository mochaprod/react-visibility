import { viewportHeight, viewportWidth } from "./viewport";

/**
 * Factory for a function that evaluates a DOM element's position
 * in the viewport.
 */
const createViewportEvaluator = (viewportDimension, upperValue, lowerValue) =>
    element => {
        if (!element) {
            return false;
        }

        const rect = element.getBoundingClientRect();
        const upper = rect[upperValue];
        const lower = rect[lowerValue];
        const latestViewportDimension = viewportDimension();

        const inView = (upper >= 0 || lower >= 0) &&
            (upper < latestViewportDimension || lower < latestViewportDimension);
        const completelyInView = upper >= 0 && lower >= 0 &&
            upper < latestViewportDimension && lower < latestViewportDimension;

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
