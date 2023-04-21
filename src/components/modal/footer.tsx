import React, {
    FC,
    ReactElement,
    ReactNode
} from "react"
import { FooterProps } from "./types"
import Button from "../basics/button"
import { getNullableNode } from "../utils/react"
import Spinner from "r-layers/basics/spinner"

type Props = FooterProps & { footerFromProps: ReactNode }

export const FOOTER_CLASS = "modal-footer"

const Footer: FC<Props> = (
    {
        ok,
        okText,
        okVariant,
        okLoading,
        cancel,
        cancelText,
        cancelVariant,
        footerBtnSize,
        footerFromProps,
        onOk,
        onCancel,
    }
) => {
    const node = getNullableNode(footerFromProps)

    if (node !== false) {
        return node as ReactElement
    }

    const spinner = okLoading ? (
        <Spinner
            variant="light"
            size="sm"
            style={{ marginRight: 5 }} />
    ) : null

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
                        size={footerBtnSize}
                        disabled={okLoading}>
                        {spinner}
                        {okText}
                    </Button>
                )
            }
        </div>
    )
}

export default Footer