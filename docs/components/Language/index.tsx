import * as React from "react"
import { LangContext } from "./context"
import { connect } from "react-redux"

function Language({
    lang,
    children
}: { lang: string, children: React.ReactNode }
) {
    return (
        <LangContext.Provider value={lang}>
            {children}
        </LangContext.Provider>
    )
}

export default connect(
    (state: any) => ({
        lang: state.lang
    })
)(Language)