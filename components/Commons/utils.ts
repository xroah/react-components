export function getPrefixFunc(prefix: string) {
    return (s?: string) => s ? `${prefix}-${s}` : prefix
}

export function isValidNode(node: any) {
    return node !== null &&
        node !== undefined &&
        typeof node !== "boolean"
}