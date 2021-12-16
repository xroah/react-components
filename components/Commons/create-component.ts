import React, {
    ReactElement,
    ElementType,
    HTMLAttributes,
    createElement,
    FunctionComponent,
    Ref,
    forwardRef,
    ForwardRefExoticComponent
} from "react"
import classNames from "reap-utils/lib/class-names"
import {DivAttrs} from "./consts-and-types"

interface HandlerReturnType<T> {
    className: string
    newProps: Partial<T>
}

type OmitClass<T> = Omit<T, "className">

type RenderFunc<T, E> = {
    (c: string, p: Partial<OmitClass<T>>, ref?: Ref<E>): ReactElement
}

interface CreateOptions<T, E = HTMLElement> {
    className?: string
    tag?: ElementType
    propsHandler?: (props: OmitClass<T>) => HandlerReturnType<T>
    render?: RenderFunc<T, E>
}

type BaseProps = HTMLAttributes<HTMLElement>
type OptionalPropNames = "displayName" | "propTypes" | "defaultProps"

function create<T extends BaseProps, E extends HTMLElement>(
    {
        className: creationClass,
        tag = "div",
        propsHandler,
        render
    }: CreateOptions<T, E>,
    props: T,
    ref?: Ref<E>
) {
    const {
        className: propClass,
        ...restProps
    } = props
    let className = ""
    let newProps: Partial<OmitClass<T>> = restProps

    if (propsHandler) {
        ({className, newProps} = propsHandler(restProps))
    }

    className = classNames(
        creationClass,
        propClass,
        className
    )

    if (render) {
        return render(className, newProps, ref)
    }

    return createElement(
        tag,
        {
            className,
            ref,
            ...newProps
        }
    )
}

type ComponentAttrs = {
    [k in OptionalPropNames]?: string | object
}

function handleComponent<T>(
    Component: FunctionComponent<T> | ForwardRefExoticComponent<T>,
    {
        displayName,
        propTypes,
        defaultProps
    }: ComponentAttrs
) {
    Component.displayName = displayName as string
    Component.propTypes = propTypes as object
    Component.defaultProps = defaultProps as object
}

function createComponent<T extends BaseProps = DivAttrs>(
    options: CreateOptions<T> &
        Pick<FunctionComponent<T>, OptionalPropNames>
) {
    let Component: FunctionComponent<T> = (props: T) => {
        return create(options, props)
    }

    handleComponent(Component, options)

    return Component
}


export function createForwardRef<
    T extends BaseProps,
    E extends HTMLElement
>(
    options: CreateOptions<T, E> &
        Pick<ForwardRefExoticComponent<T>, OptionalPropNames>
) {
    const Component = forwardRef(
        (props: T, ref: Ref<E>) => {
            return create(options, props, ref)
        }
    )

    handleComponent(Component, options)

    return Component
}

export default createComponent
