
import PropTypes from "prop-types"

export const propTypes = {
    in: PropTypes.bool,
    timeout: PropTypes.number,
    unmountOnExit: PropTypes.bool,
    appear: PropTypes.bool,
    children: PropTypes.oneOfType([PropTypes.func, PropTypes.element]).isRequired,
    onEnter: PropTypes.func,
    onEntering: PropTypes.func,
    onEntered: PropTypes.func,
    onExit: PropTypes.func,
    onExiting: PropTypes.func,
    onExited: PropTypes.func,
}