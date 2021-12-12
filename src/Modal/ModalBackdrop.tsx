import * as React from "react"
import {createPortal} from "react-dom"
import {handleFuncProp} from "reap-utils/lib/react"
import Backdrop from "../Commons/Backdrop"
import {ModalBackdropProps} from "./types"

class ModalBackdrop extends React.Component<ModalBackdropProps> {
    container: HTMLElement | null = null

    componentWillUnmount() {
        this.removeBackdrop()
    }

    removeBackdrop = () => {
        if (this.container) {
            document.body.removeChild(this.container)

            this.container = null
        }

        handleFuncProp(this.props.onExited)()
    }

    render() {
        const {
            visible,
            mountToBody,
            ...restProps
        } = this.props
        const el = (
            <Backdrop
                className="modal-backdrop"
                unmountOnExit
                onExited={this.removeBackdrop}
                visible={visible}
                {...restProps} />
        )

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

export default ModalBackdrop