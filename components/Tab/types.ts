import {NavProps} from "../Nav/Nav";

export interface Internal {
    __key__?: string
    __active_key__?: string
}


export interface TabProps extends Omit<NavProps, "onChange"> {
    animation?: boolean
    activeKey?: React.Key
    defaultActiveKey?: React.Key
    onTitleClick?: (k: string, evt: EType) => void
    onChange?: (k: string) => void
}

export interface TabState {
    active: string
}

export interface MapCallback {
    (c: React.ReactElement, key: string): React.ReactNode
}

export type EType = React.MouseEvent<HTMLAnchorElement>

export interface TitleProps extends Internal {
    onClick?: (k: string, e: EType) => void
    disabledKey?: React.Key
}