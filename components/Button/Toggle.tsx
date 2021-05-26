import * as React from "react"
import PropTypes from "prop-types"
import Button, {ButtonProps} from "./Button"

interface ToggleProps extends ButtonProps {
    defaultActive?: boolean
}

const Toggle = React.forwardRef(
    (
        {
            defaultActive,
            onClick,
            ...restProps
        }: ToggleProps,
        ref: React.Ref<HTMLElement>
    ) => {
        const controlled = "active" in restProps

        if (controlled) {
            const active = restProps.active
            const props = {
                ...restProps,
                onClick,
                active: active === undefined ? defaultActive : active
            }

            return <Button ref={ref} {...props} />
        }

        const [_active, update] = React.useState(defaultActive)
        const handleClick = (evt: React.MouseEvent<HTMLElement>) => {
            evt.preventDefault()
            update(!_active)

            if (typeof onClick === "function") {
                onClick(evt)
            }
        }

        return (
            <Button
                ref={ref}
                onClick={handleClick}
                active={_active}
                {...restProps} />
        )
    }
)

Toggle.defaultProps = {
    defaultActive: false
}
Toggle.propTypes = {
    defaultActive: PropTypes.bool
}

export default Toggle