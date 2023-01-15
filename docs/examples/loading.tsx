import React from "react"
import NestedLoading from "../../src/loading/nested"
import Button from "../../src/commons/button"
import Alert from "../../src/alert"
import { show } from "../../src/loading"
console.log(show)
export default () => {
    const [loading, toggle] = React.useState(false)
    const handleClick = () => toggle(!loading)

    return (
        <>
            <Button onClick={handleClick}>
                Toggle
            </Button>
            <NestedLoading
                loading={loading}
                variant="primary"
                closable
                onClose={handleClick}
                style={{ width: 500 }}>
                <Alert variant="primary">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Nisi consectetur dolores perferendis itaque in doloribus nihil nemo ad. Omnis nam incidunt dolorum dolore ex veritatis itaque deleniti atque, repudiandae adipisci!
                </Alert>
            </NestedLoading>
        </>
    )
}