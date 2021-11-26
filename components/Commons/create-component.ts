import {
    ReactElement,
    ElementType,
    HTMLAttributes,
    createElement,
    FunctionComponent
} from "react"
import classNames from "reap-utils/lib/class-names"

interface HandlerReturnType<T> {
    className: string
    newProps: Partial<T>
}

type OmitClass<T> = Omit<T, "className">

interface CreateOptions<T> {
    className?: string
    tag?: ElementType
    displayName?: string
    propTypes?: object
    propsHandler?: (props: OmitClass<T>) => HandlerReturnType<T>
    render?: (c: string, p: Partial<OmitClass<T>>) => ReactElement
}

type Base = HTMLAttributes<HTMLElement>
type DefaultProps = React.HTMLAttributes<HTMLDivElement>

function createComponent<T extends Base = DefaultProps>(
    {
        className: creationClass,
        tag = "div",
        displayName,
        propTypes,
        propsHandler,
        render
    }: CreateOptions<T>,
) {
    const Component: FunctionComponent<T> = (props: T) => {
        const {
            className: c,
            ...restProps
        } = props
        let className = ""
        let newProps: Partial<OmitClass<T>> = restProps

        if (propsHandler) {
            ({className, newProps} = propsHandler(restProps))
        }

        className = classNames(
            creationClass,
            className,
            c
        )

        if (render) {
            return render(className, newProps)
        }

        return createElement(
            tag,
            {
                className,
                ...newProps
            }
        )
    }

    if (displayName) {
        Component.displayName = displayName
    }

    if (propTypes) {
        Component.propTypes = propTypes
    }

    return Component
}

export default createComponent