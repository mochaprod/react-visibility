# react-in-view

React components for tracking DOM elements in the viewport.

## Install

```sh
npm install react-in-view
```

```javascript
import { InView, withInView } from "react-in-view";
```

## Usage

For all component guides, visit the **docs**.

### Advanced: `<InView>`

```jsx
import React from "react";
import { InView } from "react-in-view";

const MyComponent = props => (
    <InView>
        { ({ ref }) => (
            <div className="some-container" ref={ref}>
                I am being tracked!
            </div>
        ) }
    </InView>
);
```

For a less specific use case, the `<InView>` component provides the most control and flexibility. It accepts a *function as a child component* and passes an object as the single argument to `props.children()`. To track a specific DOM element, pass the required `ref` value to the `ref` prop of a native DOM element.

By default, the `<InView>` component subscribes to events in the `window` object, but you can pass a ref of another DOM element as the `activeElement` prop to listen for events there .
