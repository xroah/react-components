import * as React from "react";
import PropTypes from "prop-types";
import {
    handleFuncProp,
    classNames,
    reflow
} from "../utils";
import CSSTransition from "../CSSTransition";

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

    static propTypes = {
        isOpen: PropTypes.bool,
        onShow: PropTypes.func,
        onShown: PropTypes.func,
        onHide: PropTypes.func,
        onHidden: PropTypes.func
    };
    handleEnter = () => {
        handleFuncProp(this.props.onShow)();
    }

    handleEntering = (node: HTMLElement) => {
        reflow(node);
        node.style.height = `${getHeight(node)}px`;
    };

    handleEntered = (node: HTMLElement) => {
        node.style.height = "";
        handleFuncProp(this.props.onShown)();
    }

    handleExit = (node: HTMLElement) => {
        node.style.height = `${getHeight(node)}px`;
        reflow(node);
        node.style.height = "";
        handleFuncProp(this.props.onHide)();
    }

    handleExited = () => {
        handleFuncProp(this.props.onHidden)();
    }

    render() {
        const {
            className,
            isOpen,
            ...otherProps
        } = this.props;

        delete otherProps.onShow;
        delete otherProps.onShown;
        delete otherProps.onHide;
        delete otherProps.onHidden;

        return (
            <CSSTransition
                in={!!isOpen}
                timeout={350}
                appear
                onEnter={this.handleEnter}
                onEntering={this.handleEntering}
                onEntered={this.handleEntered}
                onExit={this.handleExit}
                onExited={this.handleExited}>
                {
                    state => {
                        let classes = className;
                        let enterSet = new Set(["enter", "entering", "entered"]);

                        if (enterSet.has(state)) {
                            classes = classNames(className, "collapsing");

                            if (state === "entered") {
                                classes = classNames(className, "collapse", "show");
                            }
                        } else {
                            classes = classNames(className, "collapsing");

                            if (state === "exited") {
                                classes = classNames(className, "collapse");
                            }
                        }

                        return (
                            <div className={classes} {...otherProps} />
                        );
                    }
                }
            </CSSTransition>
        );
    }

}