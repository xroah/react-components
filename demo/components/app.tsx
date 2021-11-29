import * as React from "react"
import Popup from "../../src/Popup"

export default () => {
    return (
        <>
            <div style={{height: 1000}}></div>
            <div style={{margin: 100}}>
                <Popup
                    animation={false}
                    alignment="center"
                    placement="bottom"
                    offset={10}
                    overlay={
                        <div className="rounded bg-info text-white">
                            Overlay content demo
                        </div>
                    }>
                    <button className="btn btn-primary">Popup</button>
                </Popup>
            </div>
            <div style={{height: 300}}></div>
        </>
    )
}