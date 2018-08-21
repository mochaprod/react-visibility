const __DEV__ = process.env.NODE_ENV !== "production";

const canUseDOM = !!(
    window &&
    Element &&
    window.requestAnimationFrame
);

export { __DEV__, canUseDOM };
