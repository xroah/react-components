import { LoadingCommonOptions } from "./Loading";
import { ReactNode } from "react";
import { CommonPropsWithoutTitle } from "../Common/CommonPropsInterface";
import { variantType } from "../utils";

interface ModalCommonOptions extends CommonPropsWithoutTitle<HTMLDivElement> {
    title?: string | React.ReactNode;
    okText?: string | React.ReactNode;
    cancelText?: string | React.ReactNode;
    okType?: variantType;
    cancelType?: variantType;
    fade?: boolean;
    centered?: boolean;
    size?: "xl" | "lg" | "sm";
    backdrop?: boolean | "static";
    scrollable?: boolean;
    autoFocus?: boolean;
    keyboard?: boolean;
    onOk?: (event: React.MouseEvent) => void;
    onCancel?: (event: React.MouseEvent) => void;
    onShow?: Function;
    onShown?: Function;
    onHide?: Function;
    onHidden?: Function;
}

export interface ModalProps extends ModalCommonOptions {
    visible?: boolean;
    forceRender?: boolean;
    closable?: boolean;
    showCancel?: boolean;
    showOk?: boolean;
    header?: string | React.ReactNode;
    footer?: string | React.ReactNode;
    fade?: boolean;
    mountNode?: HTMLElement;
}

export interface ModalState {
    className?: string; //for backdrop="static"
    display?: string;//for toggle display when shown or hidden
    zIndex?: number;
}

export interface ExtraModal {
    alert?: Function;
    confirm?: Function;
    prompt?: Function;
    destroyAll?: Function;
    loading?: Function;
}

export interface PopupDialogOption extends ModalCommonOptions {
    message?: string | React.ReactNode;
    placeholder?: string;
    defaultValue?: string;
}

export type DialogOption = PopupDialogOption | LoadingCommonOptions;
export type popupDialogType = "alert" | "confirm" | "prompt";
export interface LoadingDialogOptions extends LoadingCommonOptions {
    message?: string | ReactNode
}

