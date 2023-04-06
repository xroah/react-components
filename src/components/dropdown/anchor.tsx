import {
    cloneElement,
    FC,
    ReactElement,
    useContext,
    KeyboardEvent,
    RefObject
} from "react"
import { handleArrowOrEscKeyDown, MenuApi } from "./menu"
import triggerContext from "../popup/trigger-context"

interface AnchorProps {
    children: ReactElement
    menuApiRef?: RefObject<MenuApi>
}

const Anchor: FC<AnchorProps> = ({
    children,
    menuApiRef,
    ...restProps
}) => {
    const triggerCtx = useContext(triggerContext)

    if (triggerCtx.controlled) {
        return children
    }

    return cloneElement(
        children,
        {
            ...restProps,
            onKeyDown(ev: KeyboardEvent) {
                const menuApi = menuApiRef?.current

                children.props.onKeyDown?.(ev)
                handleArrowOrEscKeyDown(
                    ev,
                    {
                        onArrowDown() {
                            if (menuApi) {
                                setTimeout(menuApi.focusFirst)
                            }

                            triggerCtx.show?.()
                        },
                        onArrowUp() {
                            if (menuApi) {
                                setTimeout(menuApi.focusLast)
                            }

                            triggerCtx.show?.()
                        },
                        onEscape: triggerCtx.hide
                    }
                )
            }
        }
    )
}

export default Anchor