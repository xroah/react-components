import * as React from "react"
import classNames from "reap-utils/lib/class-names";
import {Size, SizeProp} from "./consts-and-types";
import {SizeContext} from "./contexts";
import {getProp} from "./utils";

type BaseProps = SizeProp & {className: string}

interface Props extends SizeProp {
    children: (size?: Size) => React.ReactElement | null
}

interface Options {
    tag?: React.ElementType
    getClass?: (size?: Size) => string
    prefix?: string,
    prefixAsClass?: boolean
    prefixSize?: boolean
}

export default function SizeConsumer({size, children}: Props) {
    return (
        <SizeContext.Consumer>
            {({size: ctxSize}) => children(getProp(size, ctxSize))}
        </SizeContext.Consumer>
    )
}

export function createSizeElement<T extends BaseProps>(
    props: Partial<T>,
    {
        getClass,
        tag = "div",
        prefix,
        prefixAsClass = true,
        prefixSize = true
    }: Options
) {
    const {
        size,
        className,
        ...restProps
    } = props
    
    return (
        <SizeConsumer size={size}>
            {
                size => {
                    const classes = classNames(
                        prefix && prefixAsClass && prefix,
                        prefix && prefixSize && `${prefix}-${size}`,
                        getClass && getClass(size)
                    )

                    return React.createElement(
                        tag,
                        {
                            className: classes,
                            ...restProps
                        }
                    )
                }
            }
        </SizeConsumer>
    )
}