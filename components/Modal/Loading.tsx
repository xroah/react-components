import * as React from "react"
import {classNames} from "../utils"
import Spinner, {SpinnerProps} from "../Spinner"

export interface LoadingCommonOptions extends SpinnerProps {
    type?: "spinner" | null
    node?: React.ReactNode
    visible?: boolean
    backdrop?: boolean
}

export interface LoadingProps extends LoadingCommonOptions {
    visible?: boolean
}

export default function Loading(props: LoadingProps) {
    const {
        className,
        type,
        variant,
        animation,
        visible,
        children,
        backdrop,
        borderWidth,
        size,
        node,
        ...otherProps
    } = props
    const animEl = type !== null ?
        
        <Spinner
            borderWidth={borderWidth}
            variant={variant}
            animation={animation as any}
            size={size} />
        : node

    return visible ? 
        <>
            {
                !!backdrop && <div className="modal-backdrop show" />
            }
            <div className="modal d-flex">
                <div className={
                    classNames(
                        className,
                        "d-flex",
                        "justify-content-center",
                        "align-items-center",
                        "w-100"
                    )
                } {...otherProps} >
                    {animEl}
                    <div className="bs-dialog-message">
                        {children}
                    </div>
                </div>
            </div>
        </>
        : null
}

Loading.defaultProps = {
    type: "spinner",
    animation: "border",
    backdrop: true,
    variant: "light"
}