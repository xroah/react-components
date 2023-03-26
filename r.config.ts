import path from "path"

export default {
    vite: {
        resolve: {
            alias: [
                {
                    find: "boot-scss",
                    replacement: path.join(
                        process.cwd(),
                        "node_modules/bootstrap/scss"
                    ),
                },
                {
                    find: "r-layers",
                    replacement: path.join(
                        process.cwd(),
                        "./src/components"
                    )
                }
            ]
        }
    }
}