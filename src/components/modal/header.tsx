import CloseBtn from "../basics/close-btn";
import React, {
    FunctionComponent,
    ReactNode,
    isValidElement
} from "react";
import { HeaderProps } from "./types";

type Props = HeaderProps & { defaultHeader: ReactNode }

const Header: FunctionComponent<Props> = ({
    closable,
    title,
    onClose,
    defaultHeader
}) => {
    if (defaultHeader === null) {
        return defaultHeader
    }

    const CLASS_NAME = "modal-header"

    if (defaultHeader) {
        if (isValidElement(defaultHeader)) {
            return defaultHeader
        }

        return <div className={CLASS_NAME}>{defaultHeader}</div>
    }

    return (
        <div className="modal-header">
            <h5 className="modal-title">
                {title}
            </h5>
            {closable && <CloseBtn onClick={onClose} />}
        </div>
    )
}

export default Header