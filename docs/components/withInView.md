# `withInView([props][, propsRefName])(Component)`

Higher-order component for `<InView>`. Accepts a `props` object containing the same props that are passed to `<InView>`. `withInView()` returns a higher-order component that wraps any `Component`. A prop `inViewRef` is passed to the component. You can change the name of the prop containing the ref by supplying `propsRefName`. By default it's `inViewRef`.

`withInView` makes it easier to integrate `<InView>` into established components.

## Usage

Any component:

```jsx
const MyComponent = ({ inViewRef }) = (
    <div className="my-component-class" ref={inViewRef} />
);
```

Wrap in `withInView`:

```javascript
const EnhancedMyComponent = withInView({
    onViewEnter: () => loadImages()
})(MyComponent);
```
