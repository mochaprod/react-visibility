import React from "react";
import { InView } from "ReactInView";

import Container from "./Container";
import Box from "./Box";
import Status from "./Status";

class Test extends React.Component {
    render() {
        return (
            <Container>
                <Status />
                <InView>
                    { ({ ref }) => (
                        <Box passRef={ref} />
                    ) }
                </InView>
            </Container>
        );
    }
}

export default Test;
