import * as React from "react"
import message from "../../src/Message"

export default () => {
    const showSuccess = () => {
        message.success("Success message!")
    }
    const showError = () => {
        message.error("Error message!")
    }
    const showWarn = () => {
        message.warn("Warning message!")
    }
    const showInfo = () => {
        message.info("Info message!")
    }

    return (
        <>
            <button
                className="btn btn-success ms-3"
                onClick={showSuccess}>
                Success msg
            </button>
            <button
                className="btn btn-danger ms-3"
                onClick={showError}>
                Error msg
            </button>
            <button
                className="btn btn-warning ms-3"
                onClick={showWarn}>
                Warning msg
            </button>
            <button
                className="btn btn-info ms-3"
                onClick={showInfo}>
                Info msg
            </button>
        </>
    )
}