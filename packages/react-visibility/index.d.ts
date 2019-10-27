// Type definitions for [~THE LIBRARY NAME~] [~OPTIONAL VERSION NUMBER~]
// Project: [~THE PROJECT NAME~]
// Definitions by: [~YOUR NAME~] <[~A URL FOR YOU~]>

/*~ This is the module plugin template file. You should rename it to index.d.ts
 *~ and place it in a folder with the same name as the module.
 *~ For example, if you were writing a file for "super-greeter", this
 *~ file should be 'super-greeter/index.d.ts'
 */

/*~ You can also import other modules if needed */
import * as React from "react";

export = ReactVisibility;
export as namespace ReactVisibility;

declare namespace ReactVisibility {
    interface InViewState {
        inView: boolean;
        inViewportWidth: boolean;
        inViewportHeight: boolean;
        fullyInView: boolean;
        fullyInViewportWidth: boolean;
        fullyInViewportHeight: boolean;

        enteredView: boolean;
    }

    interface InViewChildArguments extends InViewState {
        ref: React.Ref
    }

    type InViewCallback = () => void;

    interface InViewProps {
        children: (params: InViewChildArguments) => React.ReactChild;
        topOffset?: number;
        bottomOffset?: number;
        leftOffset?: number;
        rightOffset?: number;

        onViewEnter?: InViewCallback;
        onViewExit?: InViewCallback;
        onFirstViewEnter?: InViewCallback;
        onViewFullyEnter?: InViewCallback;

        activeElement?: Element | Window | null;

        event?: string;

        exposeState?: InViewCallback;
    }

    class InView extends React.Component<InViewProps> {}

    const withInView: (Component: React.Component | React.FC) => React.FC;

    interface ScrollSpyProps {
        children: () => void;
        scroll: string;
        offset: number;
        onChange?: () => void;
    }

    class ScrollSpy extends React.Component<ScrollSpyProps> {
    }

    interface WindowScrollProps {
        children: (params: WindowScrollChildrenParams) => React.ReactNode;
    }

    interface WindowScrollChildrenParams {
        containerWidth: number;
        containerHeight: number;
        scrollTop: number;
        scrollLeft: number;
        widthEnd: number;
        heightEnd: number;
    }

    class WindowScroll extends React.Component<WindowScrollProps> {
    }
}
