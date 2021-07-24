export function getPrefixFunc(prefix: string) {
    return (s?: string) => s ? `${prefix}-${s}` : prefix
}