import * as React from "react"
import {createPortal} from "react-dom"
import {classNames} from "reap-utils/lib"
import {Fade, NoTransition} from "reap-utils/lib/react"
import {FadeProps} from "reap-utils/lib/react/transition/interface"
import {
    AnimProps,
    CommonTransitionProps,
    DivProps,
    Events,
    VisibleProps
} from "./common-types"

type BaseProps = DivProps & CommonTransitionProps &
    VisibleProps & Events & AnimProps

export interface BackdropProps extends BaseProps {
    mountToBody?: boolean
}

class Backdrop extends React.Component<BackdropProps> {
    container: HTMLElement | null = null
    ref = React.createRef<HTMLDivElement>()
    onHidden = () => {
        this.removeBackdrop()
        this.props.onHidden?.()
    }

    static defaultProps: BackdropProps = {
        animation: true
    }

    removeBackdrop() {
        if (this.container) {
            document.body.removeChild(this.container)

            this.container = null
        }
    }

    componentWillUnmount() {
        this.removeBackdrop()
    }

    render() {
        const {
            visible,
            mountToBody,
            className,
            animation,
            unmountOnExit,
            onShown,
            onHidden,
            ...restProps
        } = this.props
        const classes = classNames(
            className,
            // if has no show class, modal or offcanvas backdrop,
            // background color will be black rather than translucent
            !animation && "show"
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
        const el = animation ?
            <Fade {...fadeProps} /> :
            <NoTransition {...fadeProps} />

        if (!mountToBody) {
            return el
        }

        if (!this.container) {
            if (!visible) {
                return null
            }

            this.container = document.createElement("div")

            document.body.appendChild(this.container)
        }

        return createPortal(el, this.container)
    }
}

export default Backdrop