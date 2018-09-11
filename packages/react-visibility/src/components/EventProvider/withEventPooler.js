import React from "react";

import PoolerContext from "./Context";

const withEventPooler = Component => props => (
    <PoolerContext.Consumer>
        { subscribe => (
            <Component
                { ...props }
                subscribeToPooler={ subscribe } />
        ) }
    </PoolerContext.Consumer>
);

export default withEventPooler;
