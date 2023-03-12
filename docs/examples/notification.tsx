import Toast from "r-layers/basics/toast"
import React from "react"

export default () => {
    return (
        <Toast
            title="Toast title"
            secondaryTitle="11 mins ago">
            Hello, world! This is a toast message.
        </Toast>
    )
}