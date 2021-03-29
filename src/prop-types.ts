import PropTypes from "prop-types"

const actionType = ["hover", "click", "focus"]

export const overlayPropTypes = {
    placement: PropTypes.oneOf(["top", "bottom", "left", "right"]),
    visible: PropTypes.bool,
    defaultVisible: PropTypes.bool,
    offset: PropTypes.oneOfType([
        PropTypes.number,
        PropTypes.arrayOf(PropTypes.number)
    ]),
    transitionProps: PropTypes.object,
    forceRender: PropTypes.bool,
    alignment: PropTypes.oneOf(["left", "center", "right"]),
    onClickOutside: PropTypes.func,
    onShow: PropTypes.func,
    onShown: PropTypes.func,
    onHide: PropTypes.func,
    onHidden: PropTypes.func,
    verticalCenter: PropTypes.bool,
    trigger: PropTypes.oneOfType([
        PropTypes.oneOf(actionType),
        PropTypes.arrayOf(PropTypes.oneOf(actionType))
    ]),
    delay: PropTypes.oneOfType([
        PropTypes.number,
        PropTypes.shape({
            show: PropTypes.number,
            hide: PropTypes.number
        })
    ]),
    popup: PropTypes.element.isRequired,
    popupProps: PropTypes.object,
    extraRender: PropTypes.func,
    closeOnClickOutSide: PropTypes.bool
}