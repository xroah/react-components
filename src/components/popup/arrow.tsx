import React, {
    CSSProperties,
    ReactElement,
    RefObject,
    useRef,
    useState
} from "react"
import { ComputePositionReturn } from "@floating-ui/dom"

type Return = [
    ReactElement,
    RefObject<HTMLDivElement>,
    (data: ComputePositionReturn) => void
]

export default function useArrow(className: string): Return {
    const [style, setStyle] = useState<CSSProperties>({
        position: "absolute"
    })
    const ref = useRef<HTMLDivElement>(null)
    const arrow = (
        <div
            className={className}
            ref={ref}
            style={{ ...style }} />
    )
    const updatePosition = (
        {
            placement,
            middlewareData
        }: ComputePositionReturn
    ) => {
        const { arrow, shift } = middlewareData
        const vReg = /top|bottom/
        const hReg = /left|right/
        const style: CSSProperties = {}
        // due to the tooltip and popover arrows width and height are not equal,
        // if the final placement is not same with passed,
        // eg: passed placement is top and final placement is right,
        // the arrow may not align center,
        // if shift less than threshold, apply transform(-50%) instead
        const THRESHOLD = 2
        if (vReg.test(placement)) {
            if ((shift?.x ?? 0) < THRESHOLD) {
                style.left = "50%"
                style.transform = "translateX(-50%)"
            } else {
                style.left = 0
                style.transform = `translateX(${arrow?.x ?? 0}px)`
            }

            style.top = undefined
        } else if (hReg.test(placement)) {
            if ((shift?.y ?? 0) < THRESHOLD) {
                style.top = "50%"
                style.transform = "translateY(-50%)"
            } else {
                style.top = 0
                style.transform = `translateY(${arrow?.y ?? 0}px)`
            }

            style.left = undefined
        }
        
        setStyle(s => ({ ...s, ...style }))
    }

    return [arrow, ref, updatePosition]
}