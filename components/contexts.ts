import { createContext } from "react";

export const AccordionContext = createContext(new Set());

export const FormContext = createContext({
    labelCol: null,
    labelAlign: "left",
    wrapperCol: null,
    horizontal: false
} as any);