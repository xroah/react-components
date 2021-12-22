import {DivAttrs, StatusProps} from "../Commons/consts-and-types";
import {NavProps} from "../Nav/Nav";

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

export interface TitleProps extends StatusProps {
    onClick?: (k: string, e: EType) => void
    itemKey: string
}

type Base = Omit<DivAttrs, "title">

type Callback = (k?: string) => void

export interface PaneProps extends Base, Omit<StatusProps, "active"> {
    title?: React.ReactNode // for Title component
    onShow?: Callback
    onShown?: Callback
    onHide?: Callback
    onHidden?: Callback
    // for internal only
    __key__?: boolean
    __anim__?: boolean
    __active__?: boolean
}