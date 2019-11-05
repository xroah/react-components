module.exports = api => ({
    presets: [
        [
            "@babel/preset-env",
            {
                modules: api.env() === "lib" ? "cjs" : false
            }
        ],
        "@babel/preset-react",
        "@babel/preset-typescript"
    ],
    plugins: [
        "@babel/plugin-proposal-class-properties",
        "@babel/plugin-transform-runtime"
    ],
    env: {
        test: {
            plugins: [
                "istanbul"
            ]
        }
    }
});