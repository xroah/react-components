import * as React from "react"
import Popup from "../../src/Popup/Popup"

const callbacks = {
    onShow() {
        console.log("onShow called")
    },
    onShown() {
        console.log("onShown called")
    },
    onHide() {
        console.log("onHide called")
    },
    onHidden() {
        console.log("onHidden called")
    },
    onAlign(ret: any) {
        console.log(ret)
    }
}

export default () => {
    return (
        <>
            <div>
                <Popup
                    offset={{y: 10}}
                    alignment="center"
                    autoClose="inside"
                    defaultVisible
                    overlay={
                        <div className="rounded bg-info text-white">
                            <div style={{margin: 10}}>Overlay content demo</div>
                        </div>
                    } {...callbacks}>
                    <button className="btn btn-primary mx-3">Top</button>
                </Popup>
                <Popup
                    offset={{x: 10}}
                    placement="right"
                    verticalAlign="middle"
                    trigger="hover"
                    delay={200}
                    overlay={
                        <div className="rounded bg-info p-3 text-white">
                            Overlay content demo
                        </div>
                    } {...callbacks}>
                    <button className="btn btn-primary mx-3">Right</button>
                </Popup>
                <Popup
                    animation={false}
                    offset={{y: 10}}
                    placement="bottom"
                    autoClose="outside"
                    alignment="end"
                    overlay={
                        <div className="rounded bg-info p-3 text-white">
                            Overlay content demo
                        </div>
                    } {...callbacks}>
                    <button className="btn btn-primary mx-3">Bottom</button>
                </Popup>
                <Popup
                    animation={false}
                    offset={{x: 10}}
                    placement="left"
                    trigger="focus"
                    delay={{show: 500, hide: 300}}
                    verticalAlign="bottom"
                    overlay={
                        <div className="rounded bg-info p-3 text-white">
                            Overlay content demo
                        </div>
                    } {...callbacks}>
                    <button className="btn btn-primary mx-3">Left</button>
                </Popup>
            </div>
        </>
    )
}