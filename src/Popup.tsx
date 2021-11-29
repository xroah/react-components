import * as React from "react"
import {
    getNextNodeByRef,
    only,
    Placeholder
} from "reap-utils/lib/react"
import {isUndef} from "reap-utils/lib"
import {CommonProps, ValueOf} from "./types"
import {actions} from "./constants"
import PopupInner from "./PopupInner"

type Trigger = ValueOf<typeof actions>

interface PopupProps extends CommonProps {
    children: React.ReactElement
    overlay?: React.ReactNode
    trigger?: Trigger | Trigger[]
}

interface State {
    visible: boolean
    x: number
    y: number
    mountNode: null | HTMLElement
}

export default class Popup extends React.Component<PopupProps, State> {
    placeholderRef = React.createRef<HTMLDivElement>()

    overlayRendered = false
    state = {
        visible: false,
        x: 0,
        y: 0,
        mountNode: null
    }

    static defaultProps = {
        mountNode: "body",
        placement: "top",
        animation: true
    }

    static getDerivedStateFromProps(nextProps: PopupProps, nextState: State) {
        if ("visible" in nextProps) {
            nextState.visible = !!nextProps.visible
        }

        return nextState
    }

    handleClick = (evt: React.MouseEvent<HTMLElement>) => {
        const child = this.props.children as React.ReactElement

        if (typeof child.props.onClick === "function") {
            child.props.onClick(evt)
        }

        this.setState(
            {
                visible: !this.state.visible
            }
        )
    }

    getTarget = () => {
        return getNextNodeByRef(this.placeholderRef)
    }

    render() {
        const {
            children,
            overlay,
            ...restProps
        } = this.props
        const child = only(children)

        if (isUndef(overlay)) {
            return child
        }

        return (
            <>
                <PopupInner
                    getTarget={this.getTarget}
                    visible={this.state.visible}
                    {...restProps}>
                    {overlay}
                </PopupInner>
                <Placeholder ref={this.placeholderRef} />
                {
                    React.cloneElement(
                        child,
                        {
                            onClick: this.handleClick
                        }
                    )
                }
            </>
        )
    }
}