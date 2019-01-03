import { viewportWidth, viewportHeight } from "../../util/viewport";

/**
 * Returns the
 */
function pollWindowScrollPosition() {
    // `scrollX` and `scrollY` determines how far the window
    // has been scrolled.
    const {
        scrollX,
        scrollY
    } = window;

    return {
        scrollX,
        scrollY
    };
}

function pollDocumentBodyDimensions(includeMargins = false) {
    const { body } = document;
    let {
        offsetWidth,
        offsetHeight
    } = body;

    if (includeMargins) {
        // Only compute the margins when arg is `true`
        const {
            marginTop,
            marginBottom,
            marginLeft,
            marginRight
        } = window.getComputedStyle(body);

        const xMargins = Number.parseInt(marginTop, 10)
            + Number.parseInt(marginBottom, 10);
        const yMargins = Number.parseInt(marginLeft, 10)
            + Number.parseInt(marginRight, 10);

        offsetWidth += xMargins;
        offsetHeight += yMargins;
    }

    // The `offset` properties do not include margins!
    return {
        width: offsetWidth,
        height: offsetHeight
    };
}

/**
 * Returns an object containing booleans `width` and `height`.
 * They are `true` if the sum of the scroll distance plus the viewport
 * dimension
 *
 * @param {boolean} includeMargins incorporates margins when computing
 * the document dimension.
 */
function didReachEndOfPage(includeMargins = false) {
    const {
        scrollX,
        scrollY
    } = pollWindowScrollPosition();

    const {
        width: documentWidth,
        height: documentHeight
    } = pollDocumentBodyDimensions(includeMargins);

    const vpWidth = viewportWidth();
    const vpHeight = viewportHeight();

    return {
        width: (scrollX + vpWidth) - documentWidth === 0,
        height: (scrollY + vpHeight) - documentHeight === 0
    };
}

export {
    pollWindowScrollPosition,
    pollDocumentBodyDimensions,
    didReachEndOfPage
};
