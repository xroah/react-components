import {capitalize} from "../../Commons/utils"
import createCheckComponent from "./FormCheck"

const NAME = "checkbox"

export default createCheckComponent(
    NAME,
    capitalize(NAME)
)