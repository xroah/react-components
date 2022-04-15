import * as React from "react"
import {omit} from "reap-utils"
import {
    getNextNodeByRef,
    only,
    Placeholder
} from "reap-utils/lib/react"
import {ElProps, Trigger as TriggerType} from "../Commons/common-types"
import {handleActions} from "../Commons/utils"
import Overlay, {OverlayCommonProps} from "./Overlay"

export interface TriggerProps extends OverlayCommonProps {
    nodeRef?: React.RefObject<HTMLElement>
    action?: TriggerType | TriggerType[]
    overlay: React.ReactElement
    unmountOnOverlayExit?: boolean
}

interface State {
    visible: Boolean
}

class Trigger extends React.Component<TriggerProps, State> {
    static defaultProps = {
        action: "click"
    }

    private _placeholderRef = React.createRef<HTMLDivElement>()
    private _childRef = React.createRef<HTMLElement>()

    constructor(props: TriggerProps) {
        super(props)

        this.state = {
            visible: false
        }
    }

    static getDerivedStateFromProps(
        nextProps: TriggerProps,
        nextState: State
    ) {
        if ("visible" in nextProps) {
            return {
                visible: !!nextProps.visible
            }
        }

        return nextState
    }

    componentDidUpdate() {
        if (this.props.nodeRef) {
            return
        }

        const node = getNextNodeByRef(this._placeholderRef)

        if (node) {
            (this._childRef as any).current = node
        }
    }

    private _getCallbacks() {
        const {children, action} = this.props
        const {
            onClick: cOnClick,
            onFocus: cOnFocus,
            onBlur: cOnBlur,
            onMouseEnter: cOnMouseEnter,
            onMouseLeave: cOnMouseLeave
        } = (children as React.ReactElement).props
        const onClick = (evt: React.MouseEvent) => {
            cOnClick?.(evt)
            this.toggle()
            console.log("ccc")
        }
        const onFocus = (evt: React.FocusEvent) => {
            cOnFocus?.(evt)
            this.show()
        }
        const onBlur = (evt: React.FocusEvent) => {
            cOnBlur?.(evt)
            this.hide()
        }
        const onMouseEnter = (evt: React.MouseEvent) => {
            cOnMouseEnter?.(evt)
            this.show()
        }
        const onMouseLeave = (evt: React.MouseEvent) => {
            cOnMouseLeave?.(evt)
            this.hide()
        }
        const listeners: ElProps = {
            onClick,
            onMouseEnter,
            onMouseLeave,
            onFocus,
            onBlur
        }
        const ret: ElProps = {}
        const actions = handleActions(action)

        for (let a of actions) {
            if (listeners.hasOwnProperty(a)) {
                ret[a] = listeners[a]
            }
        }

        return ret
    }

    toggle() {
        this.setState({
            visible: !this.state.visible
        })
    }

    show() {
        this.setState({
            visible: true
        })
    }

    hide() {
        this.setState({
            visible: false
        })
    }

    render() {
        const {
            overlay,
            nodeRef,
            children,
            unmountOnOverlayExit,
            ...restProps
        } = this.props

        const child = only(children)
        const c = React.cloneElement(
            child,
            {
                ...this._getCallbacks()
            }
        )

        omit(restProps, ["visible", "action"])

        return (
            <>
                {!nodeRef && <Placeholder ref={this._placeholderRef} />}
                {c}
                <Overlay
                    targetRef={nodeRef ? nodeRef : this._childRef}
                    visible={!!this.state.visible}
                    unmountOnExit={unmountOnOverlayExit}
                    {...restProps}>
                    {overlay}
                </Overlay>
            </>
        )
    }
}

export default Trigger