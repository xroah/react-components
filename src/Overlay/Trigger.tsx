import * as React from "react"
import {omit} from "reap-utils"
import {
    getNextNodeByRef,
    only,
    Placeholder
} from "reap-utils/lib/react"
import {ElProps} from "../Commons/common-types"
import {handleActions} from "../Commons/utils"
import {TriggerProps, TriggerState} from "./types"
import Overlay from "./Overlay"

class Trigger extends React.Component<TriggerProps, TriggerState> {
    static defaultProps = {
        action: "click",
        closeOnClickOutside: true
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
        nextState: TriggerState
    ) {
        if ("visible" in nextProps) {
            return {
                visible: !!nextProps.visible
            }
        }

        return nextState
    }

    componentDidMount() {
        this._updateRef()
    }

    componentDidUpdate() {
        this._updateRef()
    }

    private _updateRef() {
        if (this.props.nodeRef) {
            return
        }

        const node = getNextNodeByRef(this._placeholderRef)

        if (node && node !== this._childRef.current) {
            (this._childRef as any).current = node
        }
    }

    private _getChildCallback(
        key: keyof React.HTMLAttributes<HTMLElement>
    ) {
        return this.props.children.props[key]
    }

    private _handleClick = (evt: React.MouseEvent) => {
        this._getChildCallback("onClick")?.(evt)
        this.toggle()
    }

    private _handleFocus = (evt: React.FocusEvent) => {
        this._getChildCallback("onFocus")?.(evt)
        this.show()
    }

    private _handleBlur = (evt: React.FocusEvent) => {
        this._getChildCallback("onBlur")?.(evt)
        this.hide()
    }

    private _handleMouseEnter = (evt: React.MouseEvent) => {
        this._getChildCallback("onMouseEnter")?.(evt)
        this.show()
    }

    private _handleMouseLeave = (evt: React.MouseEvent) => {
        this._getChildCallback("onMouseLeave")?.(evt)
        this.hide()
    }

    private _getCallbacks() {
        const ret: ElProps = {}

        // not controlled
        if (!("visible" in this.props)) {
            const {action} = this.props
            const listeners: ElProps = {
                onClick: this._handleClick,
                onMouseEnter: this._handleMouseEnter,
                onMouseLeave: this._handleMouseLeave,
                onFocus: this._handleFocus,
                onBlur: this._handleBlur
            }
            const actions = handleActions(action)

            for (let a of actions) {
                if (listeners.hasOwnProperty(a)) {
                    ret[a] = listeners[a]
                }
            }
        }

        return ret
    }

    private _handleClickOutside = (evt: MouseEvent) => {
        const {target} = evt
        const {nodeRef, closeOnClickOutside} = this.props

        if (!closeOnClickOutside) {
            return
        }

        const ref = nodeRef ? nodeRef : this._childRef
        let childEl: HTMLElement | null = ref.current

        if (
            childEl &&
            target !== childEl &&
            !childEl.contains(target as HTMLElement)
        ) {
            this.hide()
        }
    }

    private _handleKeyDown = (evt: React.KeyboardEvent<HTMLElement>) => {
        const {onTargetKeyDown, children} = this.props
        const c = children as React.ReactElement

        c.props.onKeyDown?.(evt)
        onTargetKeyDown?.(evt)
    }

    toggle() {
        this.setState({
            visible: !this.state.visible
        })
    }

    show(callback?: () => void) {
        if (this.state.visible) {
            return callback?.()
        }

        this.setState({visible: true}, callback)
    }

    hide(callback?: () => void) {
        if (!this.state.visible) {
            return callback?.()
        }

        this.setState({visible: false}, callback)
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
                onKeyDown: this._handleKeyDown,
                ...this._getCallbacks()
            }
        )

        omit(
            restProps,
            [
                "visible",
                "action",
                "closeOnClickOutside",
                "onTargetKeyDown"
            ]
        )

        return (
            <>
                {!nodeRef && <Placeholder ref={this._placeholderRef} />}
                {c}
                <Overlay
                    targetRef={nodeRef ? nodeRef : this._childRef}
                    visible={!!this.state.visible}
                    unmountOnExit={unmountOnOverlayExit}
                    onClickOutside={this._handleClickOutside}
                    {...restProps}>
                    {overlay}
                </Overlay>
            </>
        )
    }
}

export default Trigger