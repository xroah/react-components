import React from "react";

export function getNode(ref: React.RefObject<HTMLElement>) {
    if (!ref.current) {
        return null
    }

    return ref.current.nextElementSibling as HTMLElement
}