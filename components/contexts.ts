import { createContext } from "react";

export const AccordionContext = createContext(new Set());

export const FormContext = createContext({
    labelCol: null,
    labelAlign: "left",
    wrapperCol: null,
    horizontal: false
} as any);

export const InputGroupContext = createContext(false);

export const TabContext = createContext({
    activeKey: "",
    fade: true,
    previousKey: "" //handle next tab active after previous fade out
});
