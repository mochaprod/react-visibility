import React from "react";

import PoolerContext from "./Context";

const withEventProvider = Component => props => (
    <PoolerContext.Consumer>
        { subscribe => (
            <Component
                { ...props }
                subscribeToEventProvider={ subscribe } />
        ) }
    </PoolerContext.Consumer>
);

export default withEventProvider;
