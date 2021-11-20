import {getNextNodeByRef} from "../../src/react/main"
import Placeholder from "../../src/react/Placeholder"
import * as React from "react"
import {render} from "react-dom"
import {act} from "react-dom/test-utils"

function Button() {
    return <button id="btn"></button>
}

it("Should get the button element", () => {
    const container = document.createElement("div")
    const ref = React.createRef<HTMLDivElement>()

    document.body.appendChild(container)
    act(
        () => {
            render(
                <>
                    <Placeholder ref={ref} />
                    <Button />
                </>,
                container
            )
        }
    )

    expect(getNextNodeByRef(ref).id).toBe("btn")
})