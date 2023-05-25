import React, { FC, ReactNode, MouseEvent, useMemo, useEffect } from "react"
import Button, { ButtonProps } from "../basics/button"
import { classnames } from "../utils"
import ArrowUp from "../icons/arrow-up"

interface BackToTopProps extends ButtonProps {
    target?: string | Element
    icon?: ReactNode
    smooth?: boolean
}

const BackToTop: FC<BackToTopProps> = (
    {
        target,
        icon,
        smooth = true,
        onClick,
        className,
        variant = "secondary",
        ...restProps
    }
) => {
    let reqId = -1
    const element = useMemo(
        () => {
            if (target !== undefined) {
                if (typeof target === "string") {
                    const node = document.querySelector(target)

                    return node as Element
                } 
                
                return target
            }

            return document.scrollingElement
        },
        [target]
    )
    const classes = classnames(
        "r-back-to-top",
        className
    )
    const scrollToTop = () => {
        const THRESHOLD = 10
        const top = element!.scrollTop
        let newTop = top / 3
        
        if (newTop < THRESHOLD) {
            newTop = 0
        } else {
            reqId = requestAnimationFrame(scrollToTop)
        }

        element!.scrollTop = newTop
    }
    const handleClick = (ev: MouseEvent<HTMLButtonElement>) => {
        onClick?.(ev)

        if (!element) {
            return
        }

        if (!smooth) {
            element.scrollTop = 0
        } else {
            scrollToTop()
        }
    }

    useEffect(
        () => {
            console.log(element)
        },
        [element]
    )

    return (
        <Button
            className={classes}
            variant={variant}
            onClick={handleClick}
            {...restProps}>
            {icon ? icon : <ArrowUp />}
        </Button>
    )
}

export default BackToTop