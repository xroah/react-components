import * as React from "react"
import {
    LangContext,
    LangMessageContext
} from "./context"

export default (
    {
        language,
        children
    }: { language: any, children: React.ReactNode }
) => (
    <LangContext.Consumer>
        {
            lang => (
                <LangMessageContext.Provider value={language[lang]}>
                    {children}
                </LangMessageContext.Provider>
            )
        }
    </LangContext.Consumer>
)