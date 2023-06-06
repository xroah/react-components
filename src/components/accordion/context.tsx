import { createContext } from "react"

interface AccordionCtx {
    activeKey: Array<string | number>
    toggle: (key: number | string) => void
}

export default createContext<AccordionCtx>({} as unknown as AccordionCtx)