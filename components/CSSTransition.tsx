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
    appear?: boolean;
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

        const {
            in: _in,
            unmountOnExit,
            appear
        } = props;
        let status;

        if (_in) {
            status = appear ? EXITED : ENTERED;
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

    componentDidMount() {
        const {
            onEntered,
            appear,
            in: _in
        } = this.props

        if (_in) {
            if (appear) {
                this.componentDidUpdate({ in: false } as CSSTransitionProps);
            } else {
                handleFuncProp(onEntered)(findDOMNode(this));
            }
        }
    }

    componentDidUpdate(prevProps: CSSTransitionProps) {
        let {
            props: { in: _in },
            state: { status },
            next,
            nextTick
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
            if (next) {
                nextTick(next);
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

    nextTick(callback: Function) {
        setTimeout(callback, 0);
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
                return this.nextTick(enteredCallback);
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
                return this.nextTick(exitedCallback);
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
        const node = findDOMNode(this) as HTMLElement;

        this.setState({
            status
        });

        if (status === ENTER) {
            this.next = () => this.handleEnter(node);
            handleFuncProp(onEnter)(node);
        } else if (status === EXIT) {
            this.next = () => this.handleExit(node);
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

        const child = React.Children.only(children) as React.ReactElement;

        return React.cloneElement(child, otherProps);
    }

}