import * as React from "react"
import {
    TransitionProps as Props,
    State,
    StateType
} from "./interface"
import {getFunction, getNextNodeByRef} from "../main"
import Placeholder from "../Placeholder"
import {
    ENTER,
    ENTERED,
    EXIT,
    EXITED,
    UNMOUNTED
} from "./constants"

export default class BaseTransition<P extends Props>
    extends React.Component<P, State> {
    protected placeholderRef = React.createRef<HTMLDivElement>()

    constructor(props: P) {
        super(props)

        const {
            in: _in,
            unmountOnExit,
            appear
        } = props
        let status: StateType

        if (_in) {
            status = appear ? EXITED : ENTERED
        } else {
            status = unmountOnExit ? UNMOUNTED : EXITED
        }

        this.state = {status}
    }

    //in case getNode returns null
    static getDerivedStateFromProps(
        nextProps: Props,
        nextState: State
    ) {
        if (nextProps.in && nextState.status === UNMOUNTED) {
            return {status: EXITED}
        }

        return nextState
    }

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
                } as P)
            } else {
                getFunction(onEntered)(this.getNode())
            }
        }
    }

    componentDidUpdate(prevProps: P) {
        let {in: _in} = this.props

        if (_in !== prevProps.in) {
            this.switchState(_in ? ENTER : EXIT)
        } else {
            this.performNext()
        }
    }

    protected performNext() {
        // do nothing
    }

    // @ts-ignore
    protected switchState(status: typeof ENTER | typeof EXIT) {
        // do nothing
    }

    protected getNode() {
        const {nodeRef} = this.props

        if (nodeRef) {
            return nodeRef.current
        }

        return getNextNodeByRef(this.placeholderRef)
    }

    protected renderPlaceholder(): React.ReactElement | null {
        if (this.props.nodeRef) {
            return null
        }

        return <Placeholder ref={this.placeholderRef} />
    }

    protected renderChildren(child: React.ReactNode) {
        return (
            <>
                {this.renderPlaceholder()}
                {child}
            </>
        )
    }
}