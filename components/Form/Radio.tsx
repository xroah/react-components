import {capitalize} from "../Commons/utils"
import createCheckComponent from "./FormCheck"

const NAME = "radio"

export default createCheckComponent(
    NAME,
    capitalize(NAME)
)