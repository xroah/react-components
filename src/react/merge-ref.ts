export default (...refs: React.Ref<any>[]) => {
    return (node: any) => {
        refs.forEach((ref: any) => {
            if (ref) {
                if ("current" in ref) {
                    ref.current = node
                } else if (typeof ref === "function") {
                    ref(node)
                }
            }
        })
    }
}