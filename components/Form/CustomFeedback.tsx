import * as React from "react"
import {FormItemContext} from "../Common/contexts"
import {getFeedbacks} from "./Wrapper"

export default () => {
	return <FormItemContext.Consumer>
		{
			({
				invalid,
				valid,
				tooltip
			}) => getFeedbacks(valid, invalid, tooltip)
		}
	</FormItemContext.Consumer>
}