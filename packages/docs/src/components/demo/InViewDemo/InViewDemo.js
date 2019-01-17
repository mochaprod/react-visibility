import React from "react";
import { InView } from "../../../../../react-visibility/src";

import Container from "./Container";
import Box from "./Box";
import Status from "./Status";

class Test extends React.Component {
    state = {
        inView: false,
        inViewportHeight: false,
        inViewportWidth: false,
        fullyInView: false,
        fullyInViewportHeight: false,
        fullyInViewportWidth: false,
        enteredView: false
    };

    offsets = {
        left: 100,
        right: 100,
        bottom: 0,
        top: -100
    };

    viewportEnter = () => {
        console.log("Entered viewport!");
    };

    viewportExit = () => {
        console.log("Exited viewport!");
    };

    viewportFirstEntry = () => {
        console.log("Entered viewport for the first time!");
    };

    expose = state => {
        this.setState({
            ...state
        });
    };

    render() {
        return (
            <Container>
                <Status { ...this.state } />
                <InView
                    leftOffset={ this.offsets.left }
                    rightOffset={ this.offsets.right }
                    topOffset={ this.offsets.top }
                    bottomOffset={ this.offsets.bottom }
                    onViewEnter={ this.viewportEnter }
                    onViewExit={ this.viewportExit }
                    onFirstViewEnter={ this.viewportFirstEntry }
                    exposeState={ this.expose }
                >
                    { ({ ref }, prevState) => (
                        <Box
                            offsets={this.offsets}
                            passRef={ref}
                            top={1500}
                            left={1500}
                        >
                            <div>Box content; previous state:</div>
                            <pre>
                                { JSON.stringify(prevState, null, 4) }
                            </pre>
                        </Box>
                    ) }
                </InView>
            </Container>
        );
    }
}

export default Test;
