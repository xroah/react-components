import React from "react"
import Button from "r-components/basics/button"
import { useToast } from "r-components/toast/toast-hook"
import {
    TOP,
    BOTTOM,
    BOTTOM_LEFT,
    BOTTOM_RIGHT,
    TOP_LEFT,
    TOP_RIGHT,
    Placement
} from "r-components/toast/toast"
import ToastInner from "r-components/toast/toast-inner"
import {} from "r-components/toast/toast-methods"

export default function ToastExample() {
    const [api, wrapper] = useToast()
    const placements: Placement[] = [
        TOP,
        BOTTOM,
        TOP_LEFT,
        TOP_RIGHT,
        BOTTOM_LEFT,
        BOTTOM_RIGHT
    ]
    const open = () => {
        const random = Math.floor(Math.random() * 100)
        const placement = placements[random % placements.length]

        api.open({
            title: "提示",
            secondaryTitle: "一分钟前",
            content: "但是龙卷风撒赖打开方式劳动法九点十六分",
            placement
        })
    }

    return (
        <div>
            <ToastInner
                variant="success"
                simple>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Qui rem adipisci, aut at ullam maxime asperiores dignissimos fugiat ea repudiandae molestias numquam? Illum, velit in voluptatibus maxime nesciunt harum rem!
            </ToastInner>
            <Button onClick={open}>
                Open notification
            </Button>
            {wrapper}
        </div>
    )
}