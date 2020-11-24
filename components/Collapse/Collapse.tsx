import * as React from "react"
import PropTypes from "prop-types"
import {
    handleFuncProp,
    classNames,
    reflow
} from "../utils"
import CSSTransition from "../Common/CSSTransition"
import {CommonProps} from "../Common/CommonPropsInterface"
import {omit} from "../utils"

export interface CollapseProps extends CommonProps<HTMLDivElement> {
    isOpen?: boolean
    onShow?: Function
    onShown?: Function
    onHide?: Function
    onHidden?: Function
}

function getHeight(node: HTMLElement) {
    return node.scrollHeight
}

export default class Collapse extends React.Component<CollapseProps> {

    static propTypes = {
        isOpen: PropTypes.bool,
        onShow: PropTypes.func,
        onShown: PropTypes.func,
        onHide: PropTypes.func,
        onHidden: PropTypes.func
    }
    handleEnter = () => {
        handleFuncProp(this.props.onShow)()
    }

    handleEntering = (node: HTMLElement) => {
        reflow(node)
        node.style.height = `${getHeight(node)}px`
    }

    handleEntered = (node: HTMLElement) => {
        node.style.height = ""
        handleFuncProp(this.props.onShown)()
    }

    handleExit = (node: HTMLElement) => {
        node.style.height = `${getHeight(node)}px`
        reflow(node)
        handleFuncProp(this.props.onHide)()
    }

    handleExiting = (node: HTMLElement) => {
        node.style.height = ""
    }

    handleExited = () => {
        handleFuncProp(this.props.onHidden)()
    }

    render() {
        const {
            className,
            isOpen,
            ...otherProps
        } = this.props

        omit(
            otherProps,
            [
                "onShow",
                "onShown",
                "onHide",
                "onHidden"
            ]
        )

        return (
            <CSSTransition
                in={!!isOpen}
                timeout={350}
                appear
                onEnter={this.handleEnter}
                onEntering={this.handleEntering}
                onEntered={this.handleEntered}
                onExit={this.handleExit}
                onExiting={this.handleExiting}
                onExited={this.handleExited}>
                {
                    state => {
                        let classes = classNames(className, "collapsing")

                        if (state === "entered" || state === "exited") {
                            classes = classNames(
                                className,
                                "collapse",
                                state === "entered" && "show"
                            )
                        }

                        return (
                            <div className={classes} {...otherProps} />
                        )
                    }
                }
            </CSSTransition>
        )
    }

}