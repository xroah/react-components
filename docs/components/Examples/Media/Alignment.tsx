import * as React from "react"
import { Media } from "reap-ui"
import img from "../../../assets/media.svg"

const text = `Cras sit amet nibh libero, in gravida nulla. Nulla vel metus scelerisque ante sollicitudin. Cras purus odio, vestibulum in vulputate at, tempus viverra turpis. Fusce condimentum nunc ac nisi vulputate fringilla. Donec lacinia congue felis in faucibus.
Donec sed odio dui. Nullam quis risus eget urna mollis ornare vel eu leo. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.`

export default () => (
    <>
        <Media
            img={img}
            imgBorder="rounded"
            title="Top-aligned media">
            <p>{text}</p>
        </Media>
        <Media
            img={img}
            imgBorder="rounded"
            alignment="middle"
            title="Center-aligned media">
            <p>{text}</p>
        </Media>
        <Media
            img={img}
            imgBorder="rounded"
            alignment="bottom"
            title="Bottom-aligned media">
            <p className="mb-0">{text}</p>
        </Media>
    </>
)