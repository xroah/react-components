import * as React from "react"
import {
    TransitionProps as Props,
    TransitionState as State
} from "./interface"
import handleFuncProp from "../handle-func-prop"

export default class BaseTransition<T extends Props, S extends State = {}>
    extends React.Component<T, S> {
    componentDidMount() {
        const {
            onEntered,
            appear,
            in: _in
        } = this.props

        if (_in) {
            if (appear) {
                this.componentDidUpdate({
                    in: false
                } as T)
            } else {
                handleFuncProp(onEntered)()
            }
        }
    }

    componentDidUpdate(props: T) {
        if (props.in) {
            // do nothing
        }
    }
}