import {chainFunction} from "reap-utils/lib";
import {Cb, Events} from "./common-types";

interface ObjectType {
    handleEnter?: Cb
    handleEntered?: Cb
    handleExit?: Cb
    handleExited?: Cb
    props: Events
}


export function getEventCallbacks<T extends ObjectType>(
    obj: T
) {
    const {
        onShow,
        onShown,
        onHide,
        onHidden
    } = obj.props

    return {
        onEnter: chainFunction(obj.handleEnter, onShow),
        onEntered: chainFunction(obj.handleEntered, onShown),
        onExit: chainFunction(obj.handleExit, onHide),
        onExited: chainFunction(obj.handleExited, onHidden)
    }
}