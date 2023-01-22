import { useState } from "react"

let zIndex = 1000

export function useZIndex() {
    return useState(zIndex++)
}