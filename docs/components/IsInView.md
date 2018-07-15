# `IsInView`

`IsInView` accepts a single child that is a React element. The child is cloned and wrapped with `<InView>` and injected with several `props`.

By default, `IsInView` assumes that the given child is a native DOM element and passes a `ref`. However, `ref` can be changed to any other string by passing the `passRefAs` prop in `IsInView` so that you can manage how the `ref` gets to a native DOM element.

The `state` of `<InView>` cannot be directly accessed, since `IsInView` hides it, so subscribing to `state` updates is the only way to respond to changes.

## Usage

The `IsInView` automatically listens for the `scroll` event in the window and checks if the wrapped `div` is visible in the viewport.

```jsx
const Tracked = () => (
    <IsInView>
        <div />
    </IsInView>
);
```

### Subscribe to `state` updates

Make use of callbacks like `onViewEnter` or `onViewExit` to respond to changes in the ref'd element.
