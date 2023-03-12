import React, {
    FC,
    ReactElement,
    ReactNode
} from "react"
import { FooterProps } from "./types"
import Button from "../basics/button"
import { getNullableNode } from "../utils/react"

type Props = FooterProps & { defaultFooter: ReactNode }

export const FOOTER_CLASS = "modal-footer"

const Footer: FC<Props> = (
    {
        ok,
        okText,
        okVariant,
        cancel,
        cancelText,
        cancelVariant,
        onOk,
        onCancel,
        defaultFooter,
        footerBtnSize
    }
) => {
    const node = getNullableNode(
        defaultFooter,
        "div",
        FOOTER_CLASS
    )

    if (node !== false) {
        return node as ReactElement
    }

    return (
        <div className={FOOTER_CLASS}>
            {
                cancel === false ? null : (
                    <Button
                        type="button"
                        variant={cancelVariant}
                        onClick={onCancel}
                        size={footerBtnSize}>
                        {cancelText}
                    </Button>
                )
            }
            {
                ok === false ? null : (
                    <Button
                        type="button"
                        onClick={onOk}
                        variant={okVariant}
                        size={footerBtnSize}>
                        {okText}
                    </Button>
                )
            }
        </div>
    )
}

export default Footer