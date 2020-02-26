import { ModalCommonOptions } from "../../basic/Modal";
import { LoadingCommonOptions } from "./Loading";
import { ReactNode } from "react";

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

