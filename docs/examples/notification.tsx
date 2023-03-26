import React from "react"
import Button from "r-layers/basics/button"
import { useNotification } from "r-layers/notification/notification-hook"
import {
    BOTTOM_LEFT,
    BOTTOM_RIGHT,
    TOP_LEFT,
    TOP_RIGHT
} from "r-layers/notification/notification"

export default function NotificationExample() {
    const [api, wrapper] = useNotification()
    const placements = [
        TOP_LEFT,
        TOP_RIGHT,
        BOTTOM_LEFT,
        BOTTOM_RIGHT
    ]
    const open = () => {
        const random = Math.floor(Math.random() * 100)
        const placement = placements[random % placements.length ]

        api.open({
            title: "提示",
            secondaryTitle: "一分钟前",
            content: "但是龙卷风撒赖打开方式劳动法九点十六分",
            placement
        })
    }

    return (
        <>
            <Button onClick={open}>
                Toggle
            </Button>
            {wrapper}
        </>
    )
}