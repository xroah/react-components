import {capitalize} from "reap-utils/lib"
import createCheckComponent from "./FormCheck"

const NAME = "radio"

export default createCheckComponent(
    NAME,
    capitalize(NAME)
)