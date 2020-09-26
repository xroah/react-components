import babel from "@rollup/plugin-babel"
import tsPlugin from "@rollup/plugin-typescript"
import resolve from "@rollup/plugin-node-resolve"
import cjs from "@rollup/plugin-commonjs"
import {terser} from "rollup-plugin-terser"

const commonCfg = {
    format: "umd",
    name: "reap",
    globals: {
        "react": "React",
        "react-dom": "ReactDOM"
    }
}
const FILE_PREFIX = "./dist/reap-ui"

export default {
    input: "components/index.ts",
    output: [{
        ...commonCfg,
        file: `${FILE_PREFIX}.js`
    }, {
        ...commonCfg,
        file: `${FILE_PREFIX}.min.js`,
        sourcemap: true,
        plugins: [terser()]
    }],
    plugins: [
        resolve(),
        cjs(),
        tsPlugin(),
        babel({
            exclude: /node_modules/,
            extensions: [".ts", ".tsx", ".js", ".jsx"],
            babelHelpers: "runtime"
        })
    ],
    external: ["react", "react-dom"]
}
