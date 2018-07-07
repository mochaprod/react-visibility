import React from "react";

const getDisplayName = Component =>
    Component.displayName || Component.name || "Component";

/**
 * Higher-order component that wraps `InView`.
 */
const withInView = Component => {
    class WithInView extends React.Component {
        static displayName = `withInView(${getDisplayName(Component)})`;

        render() {
            return (
                <Component />
            );
        }
    }

    return WithInView;
};

export default withInView;
