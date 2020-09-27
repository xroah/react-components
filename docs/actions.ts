export const UPDATE_LANGUAGE = "UPDATE_LANGUAGE"

export function updateLanguage(lang: string) {
    return {
        type: UPDATE_LANGUAGE,
        lang
    }
}