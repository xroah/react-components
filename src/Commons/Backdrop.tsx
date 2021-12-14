import * as React from "react"
import {createPortal} from "react-dom"
import {chainFunction, classNames} from "reap-utils/lib"
import {Fade, NoTransition} from "reap-utils/lib/react"
import {FadeProps} from "reap-utils/lib/react/transition/interface"
import {
    CommonTransitionProps,
    DivProps,
    Events,
    VisibleProps
} from "./common-types"

type BaseProps = DivProps & CommonTransitionProps & VisibleProps & Events

export interface BackdropProps extends BaseProps {
    fade?: boolean
    mountToBody?: boolean
}

class Backdrop extends React.Component<BackdropProps> {
    container: HTMLElement | null = null
    ref = React.createRef<HTMLDivElement>()

    removeBackdrop = () => {
        if (this.container) {
            document.body.removeChild(this.container)

            this.container = null
        }
    }

    onHidden = chainFunction(
        this.removeBackdrop,
        this.props.onHidden
    )

    static defaultProps: BackdropProps = {
        fade: true
    }

    componentWillUnmount() {
        this.removeBackdrop()
    }

    render() {
        const {
            visible,
            mountToBody,
            className,
            fade,
            unmountOnExit,
            onShown,
            onHidden,
            ...restProps
        } = this.props
        const classes = classNames(
            className,
            !fade && "show"
        )
        const child = (
            <div
                ref={this.ref}
                className={classes}
                {...restProps} />
        )
        const fadeProps: FadeProps = {
            in: !!visible,
            nodeRef: this.ref,
            unmountOnExit,
            children: child,
            onEntered: onShown,
            onExited: this.onHidden
        }
        const el = fade ?
            <Fade {...fadeProps} /> :
            <NoTransition {...fadeProps} />

        if (!mountToBody) {
            return el
        }

        if (!this.container && !visible) {
            return null
        }

        if (!this.container) {
            this.container = document.createElement("div")
            document.body.appendChild(this.container)
        }

        return createPortal(el, this.container)
    }
}

export default Backdrop