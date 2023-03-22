import { defineConfig } from "vite"
import react from "@vitejs/plugin-react"
import path from "path"

export default defineConfig({
    plugins: [react()],
    base: "./",
    css: {
        devSourcemap: true
    },
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
    },
    server: {
        open: true,
        port: 8000,
        host: true
    }
})