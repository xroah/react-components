import React from "react"
import NestedLoading from "r-layers/loading/nested"
import Button from "r-layers/basics/button"
import { useLoading } from "r-layers/loading/loading-hook"

export default function Loading() {
    const [loading, toggle] = React.useState(false)
    const handleClick = () => toggle(!loading)
    const [hookApi, wrapper] = useLoading()
    const showLoadingByHook = () => {
        hookApi.open({
            variant: "primary",
            closable: true,
            text: "正在加载..."
        })
    }
    
    return (
        <>
            <Button onClick={handleClick}>
                Toggle
            </Button>
            <Button variant="info" onClick={showLoadingByHook}>
                Show loading by hook
            </Button>
            {wrapper}
            <NestedLoading
                visible={loading}
                variant="primary"
                closable
                onClose={handleClick}
                style={{ width: 500, padding: 15 }}>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Nisi consectetur dolores perferendis itaque in doloribus nihil nemo ad. Omnis nam incidunt dolorum dolore ex veritatis itaque deleniti atque, repudiandae adipisci!
            </NestedLoading>
        </>
    )
}