import React from "react";
import PropTypes from "prop-types";

import Style from "./Box.scss";

const Box = ({
    top, right, bottom, left, offsets, children, passRef
}) => (
    <React.Fragment>
        <div
            className={Style.box}
            style={{
                top: `${top}px`,
                right: `${right}px`,
                bottom: `${bottom}px`,
                left: `${left}px`
            }}
            ref={passRef}
        >
            { children }
        </div>
        <div
            className={Style.outline}
            style={{
                top: `${top - offsets.top}px`,
                right: `${right}px`,
                bottom: `${bottom}px`,
                left: `${left - offsets.left}px`,
                paddingTop: `${offsets.top}px`,
                paddingRight: `${offsets.right}px`,
                paddingBottom: `${offsets.bottom}px`,
                paddingLeft: `${offsets.left}px`
            }} />
    </React.Fragment>
);

Box.propTypes = {
    children: PropTypes.oneOf([
        PropTypes.element,
        PropTypes.arrayOf(PropTypes.element)
    ]),
    offsets: PropTypes.shape({
        left: PropTypes.number,
        right: PropTypes.number,
        top: PropTypes.number,
        bottom: PropTypes.number
    }).isRequired,
    passRef: PropTypes.func.isRequired,
    top: PropTypes.number,
    right: PropTypes.number,
    bottom: PropTypes.number,
    left: PropTypes.number
};

Box.defaultProps = {
    children: null,
    top: 0,
    right: 0,
    bottom: 0,
    left: 0
};

export default Box;
