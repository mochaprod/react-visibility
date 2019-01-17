# Example: lazy-loading

**Lazy-loading** holds off on loading resources commonly from the network until they are really needed. This example showcases how we can use components provided in this library to implement lazy-loading for some network resources.

`<LazilyLoaded>` responds to the `enteredView` prop passed down by an `<InView>` component by implementing `componentDidUpdate()` and comparing `props` to update state if necessary.

```jsx
class LazilyLoaded extends React.Component {
    state = {
        loaded: false,
        data: null
    };

    loadResource() {
        fetchResource().then(resource =>
            this.setState({ loaded: true, data: resource.myData }));
    }

    componentDidUpdate({ enteredView }) {
        // The `enteredView` prop from the previous set of `props` is compared
        // with the current `enteredView`.
        // If resource has never been loaded and <InView> was not in view
        // previously but is now, load the resource.
        if (!this.state.loaded && !enteredView && this.props.enteredView) {
            this.loadResource();
        }
    }

    render() {
        return (
            <div ref={this.props.inViewRef}>
                { this.state.data || <SomeLoadingComponent /> }
            </div>
        );
    }
}
```

This is the parent component that uses `<InView>` to track when `<LazyLoaded>` enters the viewport for the first time. Scrolling into view `<LazyLoaded>` will trigger a state update in `<InView>` and `enteredView` is updated.

```jsx
const App = () => (
    <div>
        ...
        <InView>
            { ({ ref, enteredView }) => (
                <LazilyLoaded inViewRef={ref} enteredView={enteredView} />
            ) }
        </InView>
    </div>
);
```
