import React from "react";
import { WindowScroll } from "../../../public/static/react-visibility.commonjs2.development";

const WindowScrollDemo = () => (
    <WindowScroll>
        {
            ({ scrollY }) => (
                <div>{ scrollY }</div>
            )
        }
    </WindowScroll>
);

export default WindowScrollDemo;
