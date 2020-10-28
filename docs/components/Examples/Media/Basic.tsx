import * as React from "react"
import { Media } from "reap-ui"
import img from "../../../assets/media.svg"

export default () => (
    <Media
        title="Media heading"
        image={<Media.Image src={img}/>}>
        Cras sit amet nibh libero, in gravida nulla. Nulla vel metus scelerisque ante sollicitudin. Cras purus odio, vestibulum in vulputate at, tempus viverra turpis. Fusce condimentum nunc ac nisi vulputate fringilla. Donec lacinia congue felis in faucibus.
    </Media>
)