import React, { ReactElement, FC } from "react"

interface Props {
    getRef: (el: Element | null) => void
    children: ReactElement
}

const GetDomNode: FC<Props> = ({ getRef, children }) => {
    const _getRef = (el: HTMLElement) => {
        getRef(el?.nextElementSibling)
    }

    return (
        <>
            <span
                ref={_getRef}
                style={{
                    display: "none",
                    width: 0,
                    height: 0
                }}
            >
                Placeholder for finding dom node,
                since the findDOMNode is deprecated
            </span>
            {children}
        </>
    )
}

export default GetDomNode