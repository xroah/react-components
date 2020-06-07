module.exports = api => ({
    presets: [
        [
            "@babel/preset-env",
            {
                //Rollup requires that your Babel configuration keeps ES6 module syntax intact.
                modules: api.env() === "test" ? "cjs" : false
            }
        ],
        "@babel/preset-react",
        "@babel/preset-typescript"
    ],
    plugins: [
        "@babel/plugin-proposal-class-properties",
        "@babel/plugin-transform-runtime"
    ]
});