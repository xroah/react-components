import * as React from "react"
import {Size, SizeProp} from "./consts-and-types";
import {SizeContext} from "./contexts";
import {getProp} from "./utils";

interface Props extends SizeProp {
    children: (size?: Size) => React.ReactElement | null 
}

export default function SizeConsumer({size, children}: Props) {
    return (
        <SizeContext.Consumer>
            {
                ({size: ctxSize}) => children(getProp(size, ctxSize))
            }
        </SizeContext.Consumer>
    )
}