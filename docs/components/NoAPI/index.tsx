import * as React from "react"
import { connect } from "react-redux"
import DocHeading from "../DocHeading"

export default connect(
    (state: any) => ({
        lang: state.lang
    })
)(
    (props: {lang: "en" | "zh"; title?: string;}) => (
        <>
            {props.title && (<DocHeading.H3>{props.title}</DocHeading.H3>)}
            <div className="text-muted">
                <em>
                    {props.lang === "zh" ? 
                        "该组件暂无属性" :
                        "No public props for this component."}
                </em>
            </div>
        </>
    )
)