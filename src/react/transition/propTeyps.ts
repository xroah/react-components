import {
    bool,
    number,
    func,
    element,
    oneOfType
} from "prop-types"

export default {
    in: bool,
    timeout: number,
    unmountOnExit: bool,
    appear: bool,
    children: oneOfType([func, element]).isRequired,
    onEnter: func,
    onEntering: func,
    onEntered: func,
    onExit: func,
    onExiting: func,
    onExited: func,
}