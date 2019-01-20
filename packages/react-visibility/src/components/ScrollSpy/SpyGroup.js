import React from "react";
import PropTypes from "prop-types";

import { noop } from "../../util/env";

import ScrollSpy from "./ScrollSpy";

const hookUpChildren = (children, attachRef) => React.Children
    .map(children, (child, index) => {
        // `spyId` is an optional prop.
        const { spyId } = child.props;

        return React.cloneElement(
            child,
            {
                // Inject `attachRef()` in all children elements.
                ref: attachRef(spyId || index)
            }
        );
    });

/**
 * Bundles `<ScrollSpy>` into a much simpler component to use.
 */
const SpyGroup = ({
    children,
    component,
    doSpyOn,
    scroll,
    offset,
    onChange,
    ...otherProps
}) => (
    <ScrollSpy
        scroll={ scroll }
        offset={ offset }
        onChange={ onChange }
    >
        {
            ({
                spyRef,
                attachRef
            }) => (
                React.createElement(
                    component,
                    {
                        ...otherProps,
                        ref: doSpyOn
                            ? spyRef
                            : noop
                    },
                    hookUpChildren(children, attachRef)
                )
            )
        }
    </ScrollSpy>
);

SpyGroup.propTypes = {
    children: PropTypes.node.isRequired,
    component: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),
    doSpyOn: PropTypes.bool,
    scroll: PropTypes.string,
    offset: PropTypes.number,
    onChange: PropTypes.func
};

SpyGroup.defaultProps = {
    component: "div",
    doSpyOn: false,
    scroll: "height",
    offset: 0,
    onChange: noop
};

export default SpyGroup;
