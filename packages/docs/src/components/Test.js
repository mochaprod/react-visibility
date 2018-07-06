import React from "react";
import { InView } from "ReactInView";

import Container from "./Container";
import Box from "./Box";

class Test extends React.Component {
    render() {
        return (
            <Container>
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
