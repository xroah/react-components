import { defineConfig } from "vite"
import react from "@vitejs/plugin-react"
import path from "path"

export default defineConfig({
    plugins: [react()],
    base: "./",
    resolve: {
        alias: [
            {
                find: /~(.+)/,
                replacement: path.join(process.cwd(), 'node_modules/$1'),
            },
            {
                find: "r-layers",
                replacement: path.join(process.cwd(), "./src/components")
            }
        ]
    },
    server: {
        open: true,
        port: 8000,
        host: true
    }
})