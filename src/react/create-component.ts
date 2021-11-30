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
import classNames from "../class-names"

type OmitClass<T> = Omit<T, "className">

type RenderFunc<T, E> = {
    (c: string, p: Partial<OmitClass<T>>, ref?: Ref<E>): ReactElement
}

type DivProps = React.HTMLAttributes<HTMLDivElement>
type BaseProps = HTMLAttributes<HTMLElement>
type OptionalPropNames = "displayName" | "propTypes" | "defaultProps"
type ComponentAttrs = {
    [k in OptionalPropNames]?: string | object
}
type FuncCompOpts<T> = Pick<FunctionComponent<T>, OptionalPropNames>
type ForwardOpts<T> = Pick<ForwardRefExoticComponent<T>, OptionalPropNames>

interface HandlerReturnType<T> {
    className: string
    newProps: Partial<T>
}
interface CreateOptions<T, E = HTMLElement> {
    className?: string
    tag?: ElementType
    propsHandler?: (props: OmitClass<T>) => HandlerReturnType<T>
    render?: RenderFunc<T, E>
}

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

function handleComponent<T>(
    Component: FunctionComponent<T> | ForwardRefExoticComponent<T>,
    {
        displayName,
        propTypes,
        defaultProps
    }: ComponentAttrs
) {
    Component.displayName = <string>displayName
    Component.propTypes = <object>propTypes
    Component.defaultProps = <object>defaultProps
}

function createComponent<T extends BaseProps = DivProps>(
    options: CreateOptions<T> & FuncCompOpts<T>
) {
    let Component: FunctionComponent<T> = (props: T) => (
        create(options, props)
    )

    handleComponent(Component, options)

    return Component
}

function createForwardRef<T extends BaseProps, E extends HTMLElement>(
    options: CreateOptions<T, E> & ForwardOpts<T>
) {
    const Component = forwardRef(
        (props: T, ref: Ref<E>) => create(options, props, ref)
    )

    handleComponent(Component, options)

    return Component
}

export default createComponent
export {
    createComponent,
    createForwardRef
}