import React from "react";

import { ScrollSpy } from "../../../../../react-visibility/src";

import styles from "./ScrollSpyDemo.scss";

/* eslint react/no-danger:off */

const sections = [1, 2, 3];

// Dynamic tests
/* eslint react/prop-types:off */

class ScrollSpyDemo extends React.Component {
    state = {
        mounted: true,
        currentState: null,
        render: sections
    };

    onChange = active => {
        this.setState({ currentState: active });
    };

    setMounted = mounted => {
        this.setState({ mounted });
    };

    add = () => {
        this.setState(({ render }) => ({
            render: [...render, render.length + 1]
        }));
    };

    remove = () => {
        this.setState(({ render }) => ({
            render: render.slice(0, render.length - 1)
        }));
    };

    renderStatus = status => (
        <aside
            className={ styles.status }
            dangerouslySetInnerHTML={ {
                __html: `Current: <b>${status}</b>`
            } }
        />
    );

    renderControls = mounted => (
        <aside
            className={ styles.controls }
        >
            <button
                type="button"
                onClick={ () => this.setMounted(!mounted) }
            >
                {
                    mounted
                        ? "Unmount"
                        : "Mount"
                }
            </button>
            <button
                type="button"
                onClick={ this.add }
            >
                Add section
            </button>
            <button
                type="button"
                onClick={ this.remove }
            >
                Remove
            </button>
        </aside>
    );

    renderSpy = mounted => {
        if (mounted) {
            const { render } = this.state;

            return (
                <ScrollSpy
                    scroll="height"
                    onChange={ this.onChange }
                >
                    {
                        ({ attachRef }) => (
                            <main>
                                {
                                    render
                                        .map(s => (
                                            <section
                                                key={ s }
                                                ref={ attachRef(`${s}`) }
                                                className={ styles.section }
                                                data-title={ `Section ${s}` }
                                            />
                                        ))
                                }
                            </main>
                        )
                    }
                </ScrollSpy>
            );
        }

        return (
            <h1
                dangerouslySetInnerHTML={ {
                    __html: "<code>ScrollSpy</code> unmounted"
                } }
            />
        );
    };

    render() {
        const { mounted, currentState } = this.state;

        return (
            <div>
                { this.renderControls(mounted) }
                { this.renderStatus(currentState) }
                { this.renderSpy(mounted) }
            </div>
        );
    }
}


export default ScrollSpyDemo;
