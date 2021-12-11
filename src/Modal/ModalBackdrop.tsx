import * as React from "react"
import {createPortal} from "react-dom"
import Backdrop from "../Commons/Backdrop"
import {ModalBackdropProps} from "./types"

class ModalBackdrop extends React.Component<ModalBackdropProps> {
    container: HTMLElement | null = null
    rendered = false

    componentWillUnmount() {
        this.removeBackdrop()
    }

    removeBackdrop = () => {
        if (this.container) {
            document.body.removeChild(this.container)

            this.container = null
        }
    }

    render() {
        const {visible} = this.props

        if (!this.rendered && !visible) {
            return null
        }

        if (!this.container) {
            this.container = document.createElement("div")
            this.rendered = true

            document.body.appendChild(this.container)
        }

        return createPortal(
            <Backdrop
                className="modal-backdrop"
                onExited={this.removeBackdrop}
                visible={visible} />,
            this.container
        )
    }
}

export default ModalBackdrop