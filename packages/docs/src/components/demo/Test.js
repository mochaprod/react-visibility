import React from "react";
import { InView } from "ReactInView";

import Container from "./Container";
import Box from "./Box";
import Status from "./Status";

class Test extends React.Component {
    state = {
        inViewport: false,
        enteredViewportBefore: false
    };

    viewportEnter = () => {
        this.setState({
            inViewport: true
        }, () => console.log("Entered viewport!"));
    };

    viewportExit = () => {
        this.setState({
            inViewport: false
        }, () => console.log("Exited viewport!"));
    };

    viewportFirstEntry = () => {
        this.setState({
            enteredViewportBefore: true
        }, () => console.log("Entered the viewport for the first time!"));
    };

    render() {
        return (
            <Container>
                <Status {...this.state} />
                <InView
                    onViewEnter={this.viewportEnter}
                    onViewExit={this.viewportExit}
                    onFirstViewEnter={this.viewportFirstEntry}>
                    { ({ ref }) => (
                        <Box passRef={ref} />
                    ) }
                </InView>
            </Container>
        );
    }
}

export default Test;
