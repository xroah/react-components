import Modal from "../../basic/Modal";
import PopupDialog, {
    ExtraModal,
    dialogType,
    Option,
    modals
} from "./PopupDialog";

type _Modal = typeof Modal & ExtraModal;

const _Modal = Modal as _Modal;

const factory = (type: dialogType) => (message?: string | Option, options?: Option) => {
    let _options: any;

    if (message == null) {
        _options = options || {};
    } else if (typeof message === "object"){
        _options = {
            ...message
        };
    } else {
        _options = {
            message: String(message),
            ...options
        };
    }

    const modal = new PopupDialog(type, _options);

    modal.createDialog();
    modal.render(true);

    modals.push(modal);

    return {
        destroy: modal.close,
        update: modal.update
    };
}

_Modal.alert = factory("alert");
_Modal.confirm = factory("confirm");
_Modal.prompt = factory("prompt");
_Modal.destroyAll = () => {
    modals.forEach(m => m.close());

    modals.length = 0;
}

export default _Modal;