import * as React from "react"
import Notification from "../../src/Notification/Notification"

let uid = 0

export default () => {
    let notification: Notification | null = null
    const handleClick = () => {
        destroy()

        notification = new Notification().open(
            `notification${uid++}`,
            {
                title: "Notification",
                placement: "bottomRight"
            }
        )
    }
    const destroy = () => {
        if (notification) {
            notification.destroy()

            notification = null
        }
    }

    return (
        <>
            <button
                className="btn btn-info"
                onClick={handleClick}>
                Show notification
            </button>
            <button
                className="btn btn-danger mx-3"
                onClick={destroy}>
                Destroy notification
            </button>
        </>
    )
}