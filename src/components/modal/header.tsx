import CloseBtn from "../basics/close-btn";
import React, {
    FunctionComponent,
    ReactElement,
    ReactNode
} from "react";
import { HeaderProps } from "./types";
import { getNullableNode } from "../utils/react";

type Props = HeaderProps & { defaultHeader: ReactNode }

const Header: FunctionComponent<Props> = ({
    closable,
    title,
    onClose,
    defaultHeader
}) => {
    const CLASS_NAME = "modal-header"
    const node = getNullableNode(
        defaultHeader,
        "div",
        CLASS_NAME
    )
    
    if(node !== false) {
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