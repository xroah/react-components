import CloseBtn from "../basics/close-btn"
import React, {
    FC,
    ReactElement,
    ReactNode,
    useEffect,
    useRef,
    useState
} from "react"
import { HeaderProps } from "./types"
import { getNullableNode } from "../utils/react"

type Props = HeaderProps &
{
    headerFromProps?: ReactNode,
    onPosChange?: (x: number, y: number) => void
}

const Header: FC<Props> = ({
    closable,
    title,
    onClose,
    headerFromProps,
    draggable,
    onPosChange
}) => {
    const CLASS_NAME = "modal-header"
    const node = getNullableNode(headerFromProps)
    const [mouseDown, setMouseDown] = useState(false)
    const startX = useRef(0)
    const startY = useRef(0)
    const posX = useRef(0)
    const posY = useRef(0)
    const nodeRef = useRef<HTMLDivElement>(null)
    const handleMousedown = (ev: React.MouseEvent<HTMLElement>) => {
        if (!draggable) {
            return
        }

        startX.current = ev.clientX
        startY.current = ev.clientY
        
        ev.preventDefault()
        setMouseDown(true)
    }
    const getDis = (ev: MouseEvent): [number, number] => {
        const disX= ev.clientX - startX.current
        const disY = ev.clientY - startY.current

        return [disX, disY]
    }
    const handleMouseMove = (ev: MouseEvent) => {
        const [disX, disY] = getDis(ev)
        
        onPosChange?.(posX.current + disX, posY.current + disY)
    }
    const handleMouseUp = (ev: MouseEvent) => {
        const [disX, disY] = getDis(ev)
        posX.current += disX
        posY.current += disY
        
        setMouseDown(false)
        onPosChange?.(posX.current, posY.current)
    }

    useEffect(
        () => {
            const doc = document
            
            if (draggable && mouseDown) {
                doc.addEventListener("mousemove", handleMouseMove)
                doc.addEventListener("mouseup", handleMouseUp)
            }

            return () => {
                doc.removeEventListener("mousemove", handleMouseMove)
                doc.removeEventListener("mouseup", handleMouseUp)
            }
        },
        [draggable, mouseDown]
    )

    if (node !== false) {
        return node as ReactElement
    }

    return (
        <div
            className={CLASS_NAME}
            ref={nodeRef}
            onMouseDown={handleMousedown}
            style={{
                cursor: draggable ? "move" : undefined
            }}>
            <h5 className="modal-title">
                {title}
            </h5>
            {closable && <CloseBtn onClick={onClose} />}
        </div>
    )
}

export default Header