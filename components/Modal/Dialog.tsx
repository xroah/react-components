import * as React from "react";
import { render, unmountComponentAtNode } from "react-dom";
import { DialogOption } from "./interface";

export const modals: Dialog[] = [];

let uuid = 0;
let zIndex = 10000;

export default class Dialog {
    public container = document.createElement("div");
    public uuid = uuid++;
    public options: DialogOption;
    public closed: boolean = false;

    constructor(options: DialogOption  = {}) {
        if (!options || typeof options !== "object") options = {};

        this.options = options;
        this.container.style.zIndex = `${zIndex++}`;

        this.container.classList.add("position-relative");
        document.body.appendChild(this.container);
    }

    createDialog(visible: boolean) {
        return <></>;
    }

    close = () => {
        //already closed
        if (this.closed) return;

        this.closed = true;

        this.render(false);
    }

    destroy = () => {
        let ret = unmountComponentAtNode(this.container);

        if (ret && this.container.parentNode) {
            this.container.parentNode.removeChild(this.container);
        }

        for (let i = 0, l = modals.length; i < l; i++) {
            if (modals[i].uuid === this.uuid) {
                modals.splice(i, 1);
                break;
            }
        }
    }

    update = (options?: DialogOption) => {
        this.options = {
            ...this.options,
            ...options
        } as any;

        this.render(true);
    }

    render(visible: boolean) {

        render(
            this.createDialog(visible),
            this.container
        );
    }
}

