# Example

Declarative viewport tracking.

Control over the DOM element:

```jsx
import React from "react";
import InView from "react-in-view";

class MyComponent extends React.Component {
    render() {
        return (
            <InView
                onViewEnter={}
                onViewExit={}
                scrolledElement={}
                shouldUpdateOnChange={}>
                { ({ ref, inView, enteredView }) => (
                    <div ref={ref}>
                        This content is tracked!
                    </div>
                ) }
            </InView>
        );
    }
}
```
