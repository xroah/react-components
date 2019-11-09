import * as React from "react";
import classNames from "classnames";
import PropTypes from "prop-types";
import {Transition} from "react-transition-group";
import {handleFuncProp, reflow} from "./utils";

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

    state = {
        height: undefined
    };

    static defaultProps = {
        isOpen: false
    };

    static propTypes = {
        isOpen: PropTypes.bool
    };

    handleEntering = (node: HTMLElement) => {
        this.setState({
            height: getHeight(node)
        })
    };

    handleEntered = () => {
        this.setState({height: undefined});
        handleFuncProp(this.props.onShown)();
    };

    handleExit = (node: HTMLElement) => {
        this.setState({
            height: getHeight(node)
        });
        handleFuncProp(this.props.onHide)();
    };

    handleEnter = () => {
        handleFuncProp(this.props.onShow)();
    };

    handleExited = () => {
        handleFuncProp(this.props.onHidden)();
    };

    handExiting = (node: HTMLElement) => {
        reflow(node);
        this.setState({
            height: undefined
        });
    };

    render() {
        const {
            props: {
                isOpen,
                className,
                children,
                ...otherProps
            },
            state: {
                height
            }
        } = this;

        const style = {height};

        return (
            <Transition
                onEnter={this.handleEnter}
                onEntering={this.handleEntering}
                onEntered={this.handleEntered}
                onExit={this.handleExit}
                onExiting={this.handExiting}
                onExited={this.handleExited}
                timeout={350}
                in={isOpen}>
                {
                    state => {
                        let classes = "";

                        if (state === "entering" || state === "exiting") {
                            classes = "collapsing";
                        } else if (state === "entered") {
                            classes = "collapse show";
                        } else {
                            classes = "collapse";
                        }

                        const _className = classNames(
                            className,
                            classes
                        );

                        return (
                            <div className={_className}
                                 style={style}
                                 {...otherProps}>
                                <div className="card card-body">
                                    {children}
                                </div>
                            </div>
                        );
                    }
                }
            </Transition>
        );
    }

}