import * as React from "react"
import Popup from "../../src/Popup"

export default () => {
    return (
        <>
            <div style={{height: 1000}}></div>
            <div style={{margin: 100}}>
                <Popup
                    animation={false}
                    offset={{y: 10}}
                    alignment="center"
                    overlay={
                        <div className="rounded bg-info p-3 text-white">
                            Overlay content demo
                        </div>
                    }>
                    <button className="btn btn-primary ml-3">Top</button>
                </Popup>
                <Popup
                    animation={false}
                    offset={{x: 10}}
                    placement="right"
                    verticalAlign="middle"
                    trigger="hover"
                    overlay={
                        <div className="rounded bg-info p-3 text-white">
                            Overlay content demo
                        </div>
                    }>
                    <button className="btn btn-primary mx-3">Right</button>
                </Popup>
                <Popup
                    animation={false}
                    offset={{y: 10}}
                    placement="bottom"
                    alignment="end"
                    overlay={
                        <div className="rounded bg-info p-3 text-white">
                            Overlay content demo
                        </div>
                    }>
                    <button className="btn btn-primary mx-3">Bottom</button>
                </Popup>
                <Popup
                    animation={false}
                    offset={{x: 10}}
                    placement="left"
                    trigger="focus"
                    verticalAlign="bottom"
                    overlay={
                        <div className="rounded bg-info p-3 text-white">
                            Overlay content demo
                        </div>
                    }>
                    <button className="btn btn-primary mx-3">Left</button>
                </Popup>
            </div>
            <div style={{height: 300}}></div>
        </>
    )
}