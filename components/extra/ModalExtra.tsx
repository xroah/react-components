import * as React from "react";
import { render } from "react-dom";
import Modal from "../basic/Modal";
import Input from "../basic/Input";

interface State {

}

interface Options {

}

class ModalExtra {
    root: HTMLElement | null = null;

    mount() {
        let root = this.root;

        if (root) return;

        root = this.root = document.createElement("div");

        document.body.appendChild(root);
    }

    destroy() {
        if (!this.root) return;
    }

    render() {

    }
}

const modals = [];

export function alert() {
    const div = document.createElement("div");

    document.body.appendChild(div);

    render(
        <div>test</div>,
        div
    );
}
