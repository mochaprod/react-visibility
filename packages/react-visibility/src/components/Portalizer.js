import React from "react";
import PropTypes from "prop-types";

function createPortalizer(ReactDOM) {
    const DEFAULT_TYPE = "div";

    function createDOMHostState() {
        let prevElementHost;
        let prevElement;
        let prevElementType;

        function mountOnHost(
            type = DEFAULT_TYPE,
            host = document.body
        ) {
            const hostDidChange = host !== prevElementHost;
            const typeDidChange = prevElementType !== type;

            if (hostDidChange) {
                if (prevElementHost) {
                    prevElementHost.removeChild(prevElement);
                }

                prevElementHost = host;
            }

            if (typeDidChange) {
                if (prevElementHost) {
                    prevElementHost.removeChild(prevElement);
                }

                prevElementType = type;
                prevElement = document.createElement(type);
            }

            if (hostDidChange || typeDidChange) {
                prevElementHost.appendChild(prevElement);
            }

            return prevElement;
        }

        function cleanUp() {
            if (prevElementHost && prevElement) {
                prevElementHost.removeChild(prevElement);
            }
        }

        return {
            mountOnHost,
            cleanUp
        };
    }

    class Portalizer extends React.Component {
        static propTypes = {
            children: PropTypes.node.isRequired,
            parent: PropTypes.instanceOf(Element),
            containerType: PropTypes.string
        };

        static defaultProps = {
            parent: document.body,
            containerType: "div"
        };

        _portalHost = createDOMHostState();

        _renderIntoPortal = () => {
            const {
                children,
                parent,
                containerType
            } = this.props;

            return ReactDOM.createPortal(
                children,
                this._portalHost.mountOnHost(
                    containerType,
                    parent
                )
            );
        };

        componentWillUnmount() {
            this._portalHost.cleanUp();
        }

        render() {
            return this._renderIntoPortal();
        }
    }

    return Portalizer;
}

export default createPortalizer;
