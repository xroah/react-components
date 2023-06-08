import {
    FC,
    MouseEvent,
    ReactElement,
    cloneElement,
    useMemo,
    useRef
} from "react"
import { classnames } from "../utils"

interface BackToTopProps {
    target?: string | Element
    smooth?: boolean
    children: ReactElement
}

const BackToTop: FC<BackToTopProps> = (
    {
        target,
        smooth = true,
        children
    }
) => {
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
    const CLASS_NAME = "r-back-to-top"
    const sTop = useRef(0)
    const scrollToTop = () => {
        const THRESHOLD = 10
        let newTop = sTop.current / 2

        if (newTop < THRESHOLD) {
            newTop = 0
        } else {
            requestAnimationFrame(scrollToTop)
        }

        element!.scrollTop = newTop
        sTop.current = newTop
    }
    const handleClick = (ev: MouseEvent<HTMLButtonElement>) => {
        children.props.onClick?.(ev)

        if (
            !element ||
            element.scrollTop === 0 ||
            ev.defaultPrevented
        ) {
            return
        }

        if (!smooth) {
            element.scrollTop = 0
        } else {
            sTop.current = element.scrollTop

            scrollToTop()
        }
    }

    return cloneElement(
        children,
        {
            className: classnames(
                children.props.className,
                CLASS_NAME
            ),
            style: {
                position: "fixed",
                right: 30,
                bottom: 30,
                ...children.props.style
            },
            onClick: handleClick
        }
    )
}

export default BackToTop