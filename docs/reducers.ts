import { UPDATE_LANGUAGE } from "./actions"

export default (state = {}, action: any) => {
    switch (action.type) {
    case UPDATE_LANGUAGE:
        return {
            ...state,
            lang: action.lang
        }
    default:
        return state
    }
}