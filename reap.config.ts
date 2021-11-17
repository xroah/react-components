import {resolve} from "path"

const isDev = process.env.NODE_ENV === "development"

export default {
    webpack: {
        entry: "./docs/index.tsx",
        resolve: {
            alias: {
                "reap-ui": resolve("./components")
            }
        },
        externals: isDev ? undefined : {
            "react": "React",
            "react-dom": "ReactDOM",
            "react-router-dom": "ReactRouterDOM"
        }
    },
    htmlWebpackPlugin: {
        favicon: "./public/logo.png",
        cdn: isDev ? "" : `
            <script crossorigin src="https://unpkg.com/react@16/umd/react.production.min.js"></script>
            <script crossorigin src="https://unpkg.com/react-dom@16/umd/react-dom.production.min.js"></script>
            <script crossorigin src="https://unpkg.com/react-router-dom@5.2.0/umd/react-router-dom.min.js"></script>
        `
    },
    devServer: {
        port: 8000,
        open: true
    },
    rollup: {
        entry: "./components/index.ts",
        libName: "reap",
        include: ["./components"]
    }
}