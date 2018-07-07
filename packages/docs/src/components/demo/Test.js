import React from "react";
import { InView } from "ReactVisibility";

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

    viewportEnter = () => {
        console.log("Entered viewport!");
    };

    viewportExit = () => {
        console.log("Exited viewport!");
    };

    viewportFirstEntry = () => {
        console.log("Entered viewport for the first time!");
    };

    expose = state =>
        this.setState({
            ...state
        });

    render() {
        return (
            <Container>
                <Status {...this.state} />
                <InView
                    onViewEnter={this.viewportEnter}
                    onViewExit={this.viewportExit}
                    onFirstViewEnter={this.viewportFirstEntry}
                    exposeState={this.expose}>
                    { ({ ref }, prevState) => (
                        <Box passRef={ref}>
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
