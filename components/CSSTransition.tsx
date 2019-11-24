import * as React from "react";
import { findDOMNode } from "react-dom";
import { handleFuncProp, reflow } from './utils';

const ENTERING = "entering";
const ENTERED = "entered";
const EXITING = "exiting";
const EXITED = "exited";
const UNMOUNTED = "unmounted";

type stateType = "entering" | "entered" | "exiting" | "exited";

interface CSSTransitionProps extends React.HTMLAttributes<HTMLElement> {
    in: boolean;
    timeout: number;
    unmountOnExit?: boolean;
    children: (state: stateType) => React.ReactElement;
    onEnter?: (node?: HTMLElement) => void;
    onEntering?: (node?: HTMLElement) => void;
    onEntered?: (node?: HTMLElement) => void;
    onExit?: (node?: HTMLElement) => void;
    onExiting?: (node?: HTMLElement) => void;
    onExited?: (node?: HTMLElement) => void;
}

interface State {
    status: stateType | "unmounted";
}

export default class CSSTransition extends React.Component<CSSTransitionProps, State> {

    timer: NodeJS.Timeout | null = null;

    constructor(props: CSSTransitionProps) {
        super(props);

        const { in: _in, unmountOnExit } = props;
        let status;

        if (_in) {
            status = ENTERED;
        } else {
            if (unmountOnExit) {
                status = UNMOUNTED;
            } else {
                status = EXITED;
            }
        }

        this.state = {
            status: status as stateType
        };
    }

    componentDidUpdate(prevProps: CSSTransitionProps) {
        let {
            props: { in: _in },
            state: { status }
        } = this;

        if (_in !== prevProps.in) {
            if (_in) {
                if (status !== ENTERING && status !== ENTERED) {
                    status = ENTERING;
                }
            } else {
                if (status !== EXITED && status !== EXITING) {
                    status = EXITING;
                }
            }

            this.updateStatus(status);
        }
    }

    //in case findDOMNode return s null
    static getDerivedStateFromProps(nextProps: CSSTransitionProps, prevState: State) {
        if (nextProps.in && prevState.status === UNMOUNTED) {
            return { status: EXITED };
        }

        return prevState;
    }

    clearTimer() {
        if (this.timer !== null) {
            clearTimeout(this.timer);
            this.timer = null;
        }
    }

    handleEnter(node: HTMLElement) {
        const {
            onEnter,
            onEntering,
            onEntered,
            timeout,
            unmountOnExit
        } = this.props;

        handleFuncProp(onEnter)(node);

        if (node && unmountOnExit) {
            reflow(node);
        }

        this.setState(
            {
                status: ENTERING
            },
            () => handleFuncProp(onEntering)(node)
        );
        this.clearTimer();

        this.timer = setTimeout(() => {
            this.setState({
                status: ENTERED
            });
            handleFuncProp(onEntered)(node);
            this.clearTimer();
        }, timeout);
    }

    handleExit(node: HTMLElement) {
        const {
            onExit,
            onExiting,
            onExited,
            timeout,
            unmountOnExit
        } = this.props;
        const unmount = () => {
            if (unmountOnExit) {
                this.setState({
                    status: UNMOUNTED
                });
            }
        }

        handleFuncProp(onExit)(node);

        this.setState(
            {
                status: EXITING
            },
            () => handleFuncProp(onExiting)(node)
        );
        this.clearTimer();

        this.timer = setTimeout(() => {
            this.setState(
                {
                    status: EXITED
                },
                unmount
            );
            handleFuncProp(onExited)(node);
            this.clearTimer();
        }, timeout);
    }

    updateStatus(status: stateType) {
        const node = findDOMNode(this);

        if (status === ENTERING) {
            this.handleEnter(node as HTMLElement);
        } else if (status === EXITING) {
            this.handleExit(node as HTMLElement);
        }
    }

    render() {
        const { status } = this.state;

        if (status === UNMOUNTED) {
            return null;
        }

        const {
            children,
            ...otherProps
        } = this.props;

        delete otherProps.in;
        delete otherProps.timeout;
        delete otherProps.onEnter;
        delete otherProps.onEntering;
        delete otherProps.onEntered;
        delete otherProps.onExit;
        delete otherProps.onExiting;
        delete otherProps.onExited;

        return children(status);
    }

}