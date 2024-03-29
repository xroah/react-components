import React, {
    FC,
    ReactElement,
    ReactNode
} from "react"
import { HeaderProps } from "./types"
import { getNullableNode } from "../utils/react"
import CloseBtn from "../basics/close-btn"

type Props = HeaderProps & { headerFromProps?: ReactNode }

const Header: FC<Props> = ({
    closable,
    title,
    onClose,
    headerFromProps
}) => {
    const CLASS_NAME = "modal-header"
    const node = getNullableNode(headerFromProps)

    if (node !== false) {
        return node as ReactElement
    }

    return (
        <div className={CLASS_NAME}>
            <h5 className="modal-title">
                {title}
            </h5>
            {closable && <CloseBtn onClick={onClose} />}
        </div>
    )
}

export default Header