import * as React from "react"
import PropTypes from "prop-types"
import classNames from "reap-utils/lib/class-names"
import createComponent from "../Commons/create-component"
import {DivAttrs} from "../Commons/consts-and-types"

interface CardBodyProps extends DivAttrs {
    overlay?: boolean
}

export default createComponent<CardBodyProps>({
    displayName: "CardBody",
    propTypes: {
        overlay: PropTypes.bool
    },
    propsHandler({
        overlay,
        ...restProps
    }) {
        return {
            className: overlay ? "card-img-overlay" : "card-body",
            newProps: restProps
        }
    }
})