import * as React from "react"
import PropTypes from "prop-types"
import Button, {ButtonProps} from "./Button"

interface ToggleProps extends ButtonProps {
    defaultActive?: boolean
    onStateChange?: (state: boolean) => void
}

const Toggle = React.forwardRef(
    (
        {
            defaultActive,
            onClick,
            onStateChange,
            ...restProps
        }: ToggleProps,
        ref: React.Ref<HTMLElement & HTMLInputElement>
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
            const active = !_active

            if (typeof onStateChange === "function") {
                onStateChange(active)
            }

            if (typeof onClick === "function") {
                onClick(evt)
            }

            update(active)
            evt.preventDefault()
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
    defaultActive: PropTypes.bool,
    onStateChange: PropTypes.func
}
Toggle.displayName = "ButtonToggle"

export default Toggle