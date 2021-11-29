import {
    arrayOf,
    bool,
    element,
    func,
    instanceOf,
    node,
    number,
    object,
    oneOf,
    oneOfType,
    shape,
    string
} from "prop-types"
import {
    actions,
    aliments,
    placements,
    verticalAlign
} from "./constants"

export const popupPropTypes = {
    alignment: oneOf(aliments),
    placement: oneOf(placements),
    verticalAlign: oneOf(verticalAlign),
    forceRender: bool,
    mountNode: oneOfType([
        number,
        string,
        instanceOf(Node)
    ]),
    offset: oneOfType([
        number,
        shape({
            x: number,
            y: number
        })
    ]),
    delay: oneOfType([
        number,
        shape({
            show: number,
            hide: number
        })
    ]),
    visible: bool,
    overlayRef: oneOfType([
        func,
        object
    ]),
    animation: bool,
    children: element.isRequired,
    overlay: node,
    trigger: oneOfType([
        oneOf(actions),
        arrayOf(
            (
                propValue: any,
                key: string,
                componentName: string,
                // @ts-ignore: value is never read
                location: string,
                propFullName: string
            ) => {
                if (actions.indexOf(propValue[key]) < 0) {
                    return new Error(
                        'Invalid prop `' + propFullName + '` supplied to' +
                        ' `' + componentName + '`. Validation failed.'
                    );
                }

                return null
            }
        )

    ])
}