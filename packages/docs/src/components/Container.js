import React from "react";
import PropTypes from "prop-types";

import Style from "./Container.scss";

const Container = ({ children }) => (
    <div
        className={Style.container}>
        { children }
    </div>
);

Container.propTypes = {
    children: PropTypes.element.isRequired
};

export default Container;
