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

export const closablePropTypes = {
    onClose: func,
    closable: bool,
}

export const layerCommonPropTypes = {
    ...closablePropTypes,
    visible: bool,
    keyboard: bool,
    backdrop: oneOfType([bool, oneOf(["static"] as const)]),
}