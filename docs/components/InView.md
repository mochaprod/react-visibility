# `<InView>`

Component that accepts a function as a child component. Passes an object called `parameters` as the first argument and the previous state of `<InView>` as the second argument to `props.children()`.

**Important**: as of pre-release `v0.0.1-alpha.0` until `v0.1.0`, the second argument passed to `props.children()`, the `prevState` API is unstable. Please try using `componentDidUpdate()` to diff `<InView>` states!

| Parameter | Description |
| --- | --- |
| `ref` | **Required.** A ref to pass to a native DOM component to be tracked. An error is thrown if an invalid `ref` is received. |
| `inView` | `true` if ref'd DOM element is visible in the viewport; also the logical OR of `inViewportHeight` and `inViewportWidth`. |
| `inViewportHeight` | `true` if ref'd DOM element is in the range of the viewport height. |
| `inViewportWidth` | `true` if ref'd DOM element is in the range of the viewport width. |
| `fullyInView` | Logical OR/disjunction between `fullyInViewportHeight` and `fullyInViewportWidth`. |
| `fullyInViewportHeight` | `true` if the ref'd DOM element is completely in the range of the viewport height. |
| `fullyInViewportWidth` | `true` if the ref'd DOM element is completely in the range of the viewport width. |

## Props

| Prop | Type | Description |
| --- | --- | --- |
| `event` | `string` | Default: `"scroll"`; the event to listen for on the `activeElement` |
| `onViewEnter` | `function` | Called when ref'd DOM element enters the viewport. |
| `onFirstViewEnter` | `function` | Called when ref'd DOM element enters the viewport *for the first time* |

## Offsets

You can provide offsets to adjust the ref'd DOM element's rect size. This will change its detection range. You can choose to increase one of the rect's dimensions by including a *positive* offset or decrease a dimension by passing a *negative* offset.
