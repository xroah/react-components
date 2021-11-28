import * as React from "react"
import Popup from "../../src/Popup"

export default () => {
    return (
        <div style={{margin: 100}}>
            <Popup
                overlay={
                    <div className="rounded bg-info text-white">
                        Overlay content demo
                    </div>
                }>
                <button className="btn btn-primary">Popup</button>
            </Popup>
        </div>
    )
}