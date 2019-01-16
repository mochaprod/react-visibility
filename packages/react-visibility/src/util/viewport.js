import { pollClientDimensions } from "./container";

// In these functions 'viewport` refers to the visible
// area of an element. For `window`, that would be the literal
// dimensions of the area of the user's screen that is displaying
// content. For regular elements, the 'viewport' would be
// `clientHeight` and `clientWidth`.

const viewportHeight = (container) => pollClientDimensions(
    container
).height;

const viewportWidth = (container) => pollClientDimensions(
    container
).width;

export { viewportHeight, viewportWidth };
