import * as React from "react"
import Portal, {PortalProps} from "../../src/react/Portal"
import {act} from "react-dom/test-utils"
import {render} from "react-dom"

const CHILD_CLASS = "portal-child"

const PortalTesting = (props: PortalProps) => (
    <Portal {...props}>
        <div className="portal-child"></div>
    </Portal>
)

it("Should render to body", () => {
    const container = document.createElement("div")

    document.body.appendChild(container)

    act(
        () => {
            render(<PortalTesting visible />, container)
        }
    )

    let el = document.querySelector(`.${CHILD_CLASS}`) as HTMLElement
    const portalEl = el.parentNode

    expect(el).not.toBeNull()
    expect(document.body.contains(portalEl)).toBeTrue()

    act(
        () => {
            render(<PortalTesting visible={false} />, container)
        }
    )

    el = document.getElementById("portal-children")

    expect(el).toBeNull()
    //should be unmounted
    expect(portalEl.parentNode).toBeNull()
})

it("Should render to specified element", () => {
    const container = document.createElement("div")
    const el = document.createElement("div")
    
    document.body.appendChild(el)
    document.body.appendChild(container)

    act(
        () => {
            render(<PortalTesting visible mountNode={el} />, container)
        }
    )

    expect(el.children.length).toBeGreaterThan(0)
    expect(el.querySelector(`.${CHILD_CLASS}`)).not.toBeNull()

    act(
        () => {
            render(<PortalTesting visible={false} mountNode={el} />, container)
        }
    )

    expect(el.children.length).toBe(0)
    expect(el.querySelector(`.${CHILD_CLASS}`)).toBeNull()
})