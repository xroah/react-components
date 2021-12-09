import * as React from "react"
import Popup from "./Popup"
import OffCanvas from "./OffCanvas"

export default () => (
    <>
        <div className="my-3 text-danger fs-3">Popup</div>
        <Popup />
        <div className="my-3 text-danger fs-3">OffCanvas</div>
        <OffCanvas />
    </>
)