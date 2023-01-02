import React from "react"
import Loading from "../../src/loading/loading"
import Button from "../../src/commons/button"
import Alert from "../../src/alert"

export default () => {
    const [loading, toggle] = React.useState(false)
    const handleClick = () => toggle(!loading)

    return (
        <>
            <Button onClick={handleClick}>
                Toggle
            </Button>
            <Loading
                loading={loading}
                variant="primary"
                closable
                onClose={handleClick}>
                <Alert variant="primary" style={{ width: 500 }}>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Nisi consectetur dolores perferendis itaque in doloribus nihil nemo ad. Omnis nam incidunt dolorum dolore ex veritatis itaque deleniti atque, repudiandae adipisci!
                </Alert>
            </Loading>
        </>
    )
}