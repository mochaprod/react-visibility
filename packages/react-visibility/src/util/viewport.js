import { pollClientDimensions } from "./container";

const viewportHeight = () => pollClientDimensions().height;

const viewportWidth = () => pollClientDimensions().width;

export { viewportHeight, viewportWidth };
