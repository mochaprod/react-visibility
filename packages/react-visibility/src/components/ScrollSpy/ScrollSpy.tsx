import React, { useRef, useState, useEffect, useCallback } from "react";

import spy, { SpyElement } from "./spy";
import Store from "../../util/Store";

export interface ScrollSpyController {
    attachContainerRef: (container: HTMLElement) => void;
    attachChildRef: (id: string) => (child: HTMLElement) => void;
    active: string | null;
}

export interface ScrollSpyProps {
    children: (props: ScrollSpyController) => React.ReactElement;
    scrollType: "height" | "width";
    onChange?: (active: string) => void;
}

const ScrollSpy: React.FC<ScrollSpyProps> = ({
    children,
    scrollType,
    onChange,
}) => {
    const {
        current: store
    } = useRef<Store<SpyElement[]>>(new Store<SpyElement[]>([]));
    const containerRef = useRef<HTMLElement | null>(null);
    const [activeID, setActiveID] = useState<string | null>(null);

    const attachContainerRef = (container: HTMLElement) => {
        if (containerRef.current) {
            throw new Error("<ScrollSpy> already has a container attached.");
        }

        containerRef.current = container;
    };

    const attachChildRef = (id: string) => (child: HTMLElement) => {
        const storeState = store.getState();

        const refExists = storeState
            .find(({ id: refID }) => refID === id);

        // assert(child, "No ref passed to <ScrollSpy>. Are you sure you passed it to 'ref'?");

        if (refExists) {
            return;
        }

        store.updateState((prevState) => {
            const nextState = prevState
                .filter(({ ref }) => ref.parentNode);

            return [
                ...nextState,
                { id, ref: child }
            ];
        });
    };

    const onScroll = useCallback(() => {
        const { current: containerFromProps } = containerRef;

        let animationFrame: number = 0;

        if (animationFrame) {
            window.cancelAnimationFrame(animationFrame);
        }

        const frame = () => {
            const elements = store.getState();

            const active = spy(
                elements,
                {
                    container: containerFromProps || undefined,
                    dimension: scrollType,
                    offset: 0,
                }
            );

            if (active) {
                const { id } = active;

                if (activeID !== id) {
                    setActiveID(id);

                    if (typeof onChange === "function") {
                        onChange(id);
                    }
                }
            }
        };

        animationFrame = window.requestAnimationFrame(frame);
    }, [scrollType, onChange]);

    useEffect(onScroll);

    useEffect(() => {
        const { current: containerFromProps } = containerRef;
        const container = containerFromProps || window;

        container.addEventListener("scroll", onScroll);

        return () => container.removeEventListener("scroll", onScroll);
    });

    return children({
        attachContainerRef,
        attachChildRef,
        active: activeID,
    });
};

ScrollSpy.defaultProps = {
    scrollType: "height"
};

export default ScrollSpy;
