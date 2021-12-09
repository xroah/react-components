import * as React from "react"
import {TransitionProps as Props, State} from "./interface"
import {handleFuncProp} from "../main"
import {getNextNodeByRef} from ".."

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

    getNode(): Element | null {
        return getNextNodeByRef(this.placeholderRef)
    }

    renderPlaceholder(): React.ReactElement | null {
        return <div ref={this.placeholderRef} />
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