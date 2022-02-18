import * as React from "react"
import OffCanvas from "./OffCanvas"
import Modal from "./Modal"
import Toast from "./Toast"
import Notification from "./Notification"
import Message from "./Message"

export default () => (
    <>
        <div style={{height: 1000}}></div>
        <div className="my-3 text-danger fs-3">OffCanvas</div>
        <OffCanvas />
        <div className="my-3 text-danger fs-3">Modal</div>
        <Modal />
        <div className="my-3 text-danger fs-3">Toast</div>
        <Toast />
        <div className="my-3 text-danger fs-3">Notification</div>
        <Notification />
        <div className="my-3 text-danger fs-3">Message</div>
        <Message />
        <div style={{height: 300}}></div>
    </>
)