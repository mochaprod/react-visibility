import { pollClientDimensions } from "./dom";
import { ContainerElement } from "./env";

// In these functions 'viewport` refers to the visible
// area of an element. For `window`, that would be the literal
// dimensions of the area of the user's screen that is displaying
// content. For regular elements, the 'viewport' would be
// `clientHeight` and `clientWidth`.

const viewportHeight = (container: ContainerElement) => pollClientDimensions(
    container
).height;

const viewportWidth = (container: ContainerElement) => pollClientDimensions(
    container
).width;

export { viewportHeight, viewportWidth };
