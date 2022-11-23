import {
    func,
    bool,
    oneOfType,
    oneOf
} from "prop-types"

export const toggleEventPropTypes = {
    onShow: func,
    onShown: func,
    onHide: func,
    onHidden: func
}

export const layerCommonPropTypes = {
    onClose: func,
    visible: bool,
    keyboard: bool,
    backdrop: oneOfType([bool, oneOf(["static"] as const)]),
    closable: bool,
}