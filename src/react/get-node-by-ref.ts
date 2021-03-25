import * as React from "react";

export default (ref: React.RefObject<HTMLElement>) => {
    if (!ref.current) {
        return null
    }

    return ref.current.nextElementSibling
}