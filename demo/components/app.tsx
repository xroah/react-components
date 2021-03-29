import * as React from "react"
import Overlay from "../../src/Overlay"

export default () => {
    return (
        <div style={{padding: 30}}>
            <div style={{
                height: 600,
                overflow: "auto",
                position: "relative"
            }} id="container">
                <Overlay
                    trigger="click"
                    closeOnClickOutSide
                    popupMountNode="#container"
                    popup={
                        <div style={{width: 200, backgroundColor: "deepskyblue"}}>
                            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Suscipit magnam iusto similique unde ipsam quas at repellendus. Molestias id ad tempore odit. Laborum aut dignissimos aperiam amet itaque veritatis rem.
                    </div>
                    }>
                    <button
                        className="btn btn-primary"
                        style={{
                            marginLeft: 80,
                            marginTop: 80
                        }}>Toggle popup</button>
                </Overlay>
                <div style={{width: 300, height: 700}}>
                    Lorem ipsum dolor sit, amet consectetur adipisicing elit. Magnam adipisci quos omnis unde eos excepturi rem hic quaerat debitis aliquid. Commodi voluptatibus ullam sit veniam dolores enim, eligendi nobis architecto!
                    lore
                </div>
            </div>
            <Overlay
                trigger="hover"
                placement="top"
                forceRender
                transition={null}
                delay={3000}
                popup={
                    <div className="dropdown-menu show" style={{position: "relative"}}>
                        <a className="dropdown-item" href="#">Action</a>
                        <a className="dropdown-item" href="#">Another action</a>
                        <a className="dropdown-item" href="#">Something else here</a>
                    </div>
                }>
                <button className="btn btn-danger">Hover</button>
            </Overlay>
            <div style={{width: 300}}>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Soluta obcaecati dignissimos veritatis, maxime aut perspiciatis aliquam magni doloribus modi a, quod id tempora, dolorem facilis vero excepturi sequi veniam odio?
            </div>
        </div>
    )
}