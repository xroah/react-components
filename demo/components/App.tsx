import * as React from "react"
import Popup from "./Popup"
import OffCanvas from "./OffCanvas"
import Modal from "./Modal"
import Toast from "./Toast"
import Notification from "./Notification"

export default () => (
    <>
        <div style={{height: 1000}}></div>
        <div className="my-3 text-danger fs-3">Popup</div>
        <Popup />
        <div className="my-3 text-danger fs-3">OffCanvas</div>
        <OffCanvas />
        <div className="my-3 text-danger fs-3">Modal</div>
        <Modal />
        <div className="my-3 text-danger fs-3">Toast</div>
        <Toast />
        <div className="my-3 text-danger fs-3">Notification</div>
        <Notification />
        <div style={{height: 300}}></div>
    </>
)