import React from "react";
import { Switch, Route } from "react-router-dom";

import routes from "./routes";

const Router = () => (
    <Switch>
        {
            routes.map(route => (
                <Route
                    key={ route[0] }
                    exact
                    path={ route[0] }
                    component={ route[1] }
                />
            ))
        }
    </Switch>
);

export default Router;
