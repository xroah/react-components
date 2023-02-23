import React, {
    FunctionComponent,
    ReactElement,
    ReactNode
} from "react";
import { FooterProps } from "./types";
import Button from "../basics/button";
import { getNullableNode } from "../utils/react";

type Props = FooterProps & { defaultFooter: ReactNode }

const Footer: FunctionComponent<Props> = (
    {
        okText,
        cancelText,
        onOk,
        onCancel,
        defaultFooter,
        footerBtnSize
    }
) => {
    const CLASS_NAME = "modal-footer"
    const node = getNullableNode(
        defaultFooter,
        "div",
        CLASS_NAME
    )

    if (node !== false) {
        return node as ReactElement
    }

    return (
        <div className={CLASS_NAME}>
            <Button
                type="button"
                variant="secondary"
                onClick={onCancel}
                size={footerBtnSize}>
                {cancelText}
            </Button>
            <Button
                type="button"
                onClick={onOk}
                size={footerBtnSize}>
                {okText}
            </Button>
        </div>
    )
}

export default Footer