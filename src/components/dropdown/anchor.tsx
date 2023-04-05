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
    const menuApi = menuApiRef?.current

    if(triggerCtx.controlled) {
        return children
    }

    return cloneElement(
        children,
        {
            ...restProps,
            onKeyDown(ev: KeyboardEvent) {
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
                                setTimeout(menuApi.focusFirst)
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