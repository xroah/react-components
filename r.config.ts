import path from "path"

export default {
    vite: {
        resolve: {
            alias: [
                {
                    find: "r-components",
                    replacement: path.join(
                        process.cwd(),
                        "./src/components"
                    )
                }
            ]
        }
    }
}