import * as React from "react";
import { findDOMNode } from "react-dom";
import { handleFuncProp } from './utils';

const ENTER = "enter";
const ENTERING = "entering";
const ENTERED = "entered";
const EXIT = "exit";
const EXITING = "exiting";
const EXITED = "exited";
const UNMOUNTED = "unmounted";

type stateType = "enter" | "entering" | "entered" | "exit" | "exiting" | "exited";

export interface CSSTransitionProps extends React.HTMLAttributes<HTMLElement> {
    in: boolean;
    timeout?: number;
    unmountOnExit?: boolean;
    children: ((state: stateType) => React.ReactElement) | React.ReactElement;
    onEnter?: (node: HTMLElement) => void;
    onEntering?: (node: HTMLElement) => void;
    onEntered?: (node: HTMLElement) => void;
    onExit?: (node: HTMLElement) => void;
    onExiting?: (node: HTMLElement) => void;
    onExited?: (node: HTMLElement) => void;
}

interface State {
    status: stateType | "unmounted";
}

export default class CSSTransition extends React.Component<CSSTransitionProps, State> {

    timer: NodeJS.Timeout | null = null;
    next: Function | null = null;

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
        const enterSet = new Set([ENTER, ENTERING, ENTERED]);
        const exitSet = new Set([EXIT, EXITING, EXITED]);

        if (_in !== prevProps.in) {
            this.next = null;

            if (_in) {
                if (!enterSet.has(status)) {
                    status = ENTER;
                }
            } else {
                if (!exitSet.has(status)) {
                    status = EXIT;
                }
            }

            this.updateStatus(status as stateType);
        } else {
            if (this.next) {
                this.next();
            }
        }
    }

    //in case findDOMNode returns null
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
            onEntering,
            onEntered,
            timeout,
        } = this.props;
        const enteredCallback = () => {
            this.setState({
                status: ENTERED
            });
            handleFuncProp(onEntered)(node);
        };
        this.next = () => {
            this.next = null;
            if (timeout == undefined) {
                return setTimeout(enteredCallback, 0);
            }

            this.timer = setTimeout(() => {
                enteredCallback();
                this.clearTimer();
            }, timeout);
        }

        this.clearTimer();
        this.setState({
            status: ENTERING
        });
        handleFuncProp(onEntering)(node);
    }

    handleExit(node: HTMLElement) {
        const {
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
        const exitedCallback = () => {
            this.setState(
                {
                    status: EXITED
                },
                unmount
            );
            handleFuncProp(onExited)(node);
        };
        this.next = () => {
            this.next = null;
            if (timeout == undefined) {
                return setTimeout(exitedCallback, 0);
            }

            this.timer = setTimeout(() => {
                exitedCallback();
                this.clearTimer();
            }, timeout);
        };

        this.clearTimer();
        this.setState({
            status: EXITING
        });
        handleFuncProp(onExiting)(node)
    }

    updateStatus(status: stateType) {
        const { onEnter, onExit } = this.props;
        const node = findDOMNode(this);

        this.setState({
            status
        });

        if (status === ENTER) {
            this.next = () => setTimeout(() => this.handleEnter(node as HTMLElement));
            handleFuncProp(onEnter)(node);
        } else if (status === EXIT) {
            this.next = () => setTimeout(() => this.handleExit(node as HTMLElement));
            handleFuncProp(onExit)(node);
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

        if (typeof children === "function") {
            return children(status);
        }

        return React.Children.only(children);
    }

}