import React from "react";
import PropTypes from "prop-types";

import Style from "./Box.scss";

const Box = props => (
    <div
        className={Style.box}
        ref={props.passRef}
        {...props} />
);

Box.propTypes = {
    passRef: PropTypes.func.isRequired
};

export default Box;
