import * as React from "react"
import Notification from "../../src/Notification"

let uid = 0

export default () => {
    const handleClick = () => {
        new Notification().open(
            `notification${uid++}`,
            {
                title: "Notification",
                placement: "topLeft"
            }
        )
    }

    return (
        <button
            className="btn btn-info"
            onClick={handleClick}>
            Show notification
        </button>
    )
}