import {
    HTMLAttributeAnchorTarget,
    HTMLAttributeReferrerPolicy,
    ReactElement
} from "react"

export type Booleanish = boolean | "true" | "false"

export interface AnchorCommonProps {
    download?: any;
    href?: string | undefined;
    hrefLang?: string | undefined;
    media?: string | undefined;
    ping?: string | undefined;
    rel?: string | undefined;
    target?: HTMLAttributeAnchorTarget | undefined;
    type?: string | undefined;
    referrerPolicy?: HTMLAttributeReferrerPolicy | undefined;
}

export interface CSSComponentProps {
    className?: string
}