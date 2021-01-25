import * as React from "react"
import {FormItemContext} from "../Common/contexts"
import {getFeedbacks} from "./Wrapper"

const FeedBack= () => (
    <FormItemContext.Consumer>
        {
            ({
                invalid,
                valid,
                tooltip
            }) => getFeedbacks(valid, invalid, tooltip)
        }
    </FormItemContext.Consumer>
)
FeedBack.displayName = "FeedBack"

export default FeedBack