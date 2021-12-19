import {capitalize} from "reap-utils/lib"
import createCheckComponent from "./FormCheck"

const NAME = "checkbox"

export default createCheckComponent(
    NAME,
    capitalize(NAME)
)