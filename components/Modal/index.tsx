import Modal from "./Modal";
import {
    ExtraModal,
    popupDialogType,
    PopupDialogOption
} from "./interface";
import Dialog, { modals } from "./Dialog";
import PopupDialog from "./PopupDialog";
import LoadingDialog from "./LoadingDialog";

type _Modal = typeof Modal & ExtraModal;

const _Modal = Modal as _Modal;

const factory = (type: popupDialogType | "loading") =>
    (message?: string | PopupDialogOption, options?: PopupDialogOption) => {
        let _options: any;
        let modal: Dialog;

        if (message == null) {
            _options = options || {};
        } else if (typeof message === "object") {
            _options = {
                ...message
            };
        } else {
            _options = {
                message: String(message),
                ...options
            };
        }

        if (type === "loading") {
            modal = new LoadingDialog(_options);
        } else {
            modal = new PopupDialog(type, _options);
        }

        modal.render(true);

        modals.push(modal);

        return {
            close: modal.close,
            update: modal.update
        };
    }

_Modal.alert = factory("alert");
_Modal.confirm = factory("confirm");
_Modal.prompt = factory("prompt");
_Modal.loading = factory("loading");
_Modal.destroyAll = () => {
    modals.forEach(m => m.close());

    modals.length = 0;
}
export default _Modal;