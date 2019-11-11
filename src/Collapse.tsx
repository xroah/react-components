import * as React from "react";
import PropTypes from "prop-types";
import {
    emulateTransitionEnd,
    handleFuncProp,
    reflow,
    classNames
} from "./utils";

export interface CollapseProps extends React.HTMLAttributes<HTMLDivElement> {
    isOpen?: boolean;
    onShow?: Function;
    onShown?: Function;
    onHide?: Function;
    onHidden?: Function;
}

function getHeight(node: HTMLElement) {
    return node.scrollHeight;
}

export default class Collapse extends React.Component<CollapseProps> {

    static defaultProps = {
        isOpen: false
    };

    static propTypes = {
        isOpen: PropTypes.bool
    };

    private ref: React.RefObject<HTMLDivElement> = React.createRef();
    private cancelTransition: Function | null = null;

    getRef() {
        return this.ref.current;
    }

    componentDidMount() {
        const el = this.getRef();
        const {isOpen} = this.props;

        if (el && isOpen) {
            el.classList.add("show");
        }
    }

    shouldComponentUpdate(nextProps: CollapseProps) {
        return nextProps.isOpen !== this.props.isOpen;
    }

    handleTransitionEnd(el: HTMLElement) {
        const {
            onShown,
            onHidden,
            isOpen
        } = this.props;

        el.classList.remove("collapsing");
        el.classList.add("collapse");

        if (isOpen) {
            el.classList.add("show");
            el.style.height = "";
            handleFuncProp(onShown)();
        } else {
            handleFuncProp(onHidden)();
        }

        this.cancelTransition = null;
    };


    componentDidUpdate() {
        const {
            isOpen,
            onShow,
            onHide,
        } = this.props;
        const el = this.getRef();

        if (!el) return;

        el.classList.remove("collapse", "show");

        if (this.cancelTransition) {
            this.cancelTransition();
        }

        if (isOpen) {
            el.classList.add("collapsing");
            handleFuncProp(onShow)();
            reflow(el);
            el.style.height = `${getHeight(el)}px`;
            this.cancelTransition = emulateTransitionEnd(el, () => {
                this.handleTransitionEnd(el);
            });
        } else {
            el.style.height = `${getHeight(el)}px`;
            reflow(el);
            el.classList.add("collapsing");
            el.style.height = "";
            handleFuncProp(onHide)();
            this.cancelTransition = emulateTransitionEnd(el, () => {
                this.handleTransitionEnd(el);
            });
        }
    }

    render() {
        const {
            className,
            ...otherProps
        } = this.props;

        delete otherProps.onShow;
        delete otherProps.onShown;
        delete otherProps.onHide;
        delete otherProps.onHidden;
        delete otherProps.isOpen;

        return (
            <>
                <div
                    className={
                        classNames(className, "collapse")
                    }
                    ref={this.ref}
                    {...otherProps}/>
            </>
        );
    }

}