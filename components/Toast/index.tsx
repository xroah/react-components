import Toast from "./Toast"
import Icon from "./Icon"

interface ToastComponent {
    Icon: typeof Icon
}

type ToastType = typeof Toast & ToastComponent

const _Toast = Toast as ToastType

_Toast.Icon = Icon

export default _Toast