const path = require("path")

module.exports = {
    webpack: {
        entry: "./docs/index.tsx",
        resolve: {
            alias: {
                "reap-ui$": path.resolve("./components/index.ts")
            }
        },
        externals: {
            "react": "React",
            "react-dom": "ReactDOM",
            "react-router-dom": "ReactRouterDOM"
        }
    },
    htmlWebpackPlugin: {
        favicon: "./public/logo.png"
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