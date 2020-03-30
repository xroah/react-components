import * as React from "react";
import Loading from "./Loading";
import { LoadingDialogOptions } from "./interface";
import Dialog from "./Dialog";
import { chainFunction } from "../utils";

export default class LoadingDialog extends Dialog {
    options: LoadingDialogOptions;

    constructor(options: LoadingDialogOptions) {
        super(options);

        if (!options || typeof options !== "object") options = {} as any;

        this.options = options;
        this.close = chainFunction(this.close, this.destroy);
    }

    createDialog(visible: boolean) {
        const {
            message,
            ...otherProps
        } = this.options;

        return (
            <Loading visible={visible} {...otherProps}>
                {message}
            </Loading>
        );
    }
    
}

