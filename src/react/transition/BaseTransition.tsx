import * as React from "react"
import {TransitionProps as Props, State} from "./interface"
import {handleFuncProp, getNextNodeByRef} from "../main"
import Placeholder from "../Placeholder"

export default class BaseTransition<T extends Props, S extends State>
    extends React.Component<T, S> {
    protected placeholderRef = React.createRef<HTMLDivElement>()

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
                handleFuncProp(onEntered)(this.getNode())
            }
        }
    }

    componentDidUpdate(props: T) {
        if (props.in) {
            // do nothing
        }
    }

    getNode() {
        const {nodeRef} = this.props

        if (nodeRef) {
            return nodeRef.current
        }

        return getNextNodeByRef(this.placeholderRef)
    }

    renderPlaceholder(): React.ReactElement | null {
        if (this.props.nodeRef) {
            return null
        }

        return <Placeholder ref={this.placeholderRef} />
    }

    renderChildren(child: React.ReactNode) {
        return (
            <>
                {this.renderPlaceholder()}
                {child}
            </>
        )
    }
}