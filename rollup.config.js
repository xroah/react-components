import babel from "rollup-plugin-babel";
import tsPlugin from "rollup-plugin-typescript";
import resolve from "rollup-plugin-node-resolve";
import cjs from "rollup-plugin-commonjs";
import { uglify } from "rollup-plugin-uglify";

const config = {
    input: "src/index.ts",
    output: {
        format: "umd",
        name: "reap",
        globals: {
            "react": "React",
            "react-dom": "ReactDOM"
        }
    },
    plugins: [
        resolve(),
        cjs(),
        tsPlugin(),
        babel({
            exclude: "/node_modules/",
            extensions: ['.js', '.jsx', '.ts', '.tsx'],
            runtimeHelpers: true
        })
    ],
    external: ["react", "react-dom"]
};

export default args => {
    const FILE_PREFIX = './dist/react-bs';
    let file;
    let sourcemap = false;
    let output = config.output;
    let compact = args.compact;

    if (compact) {
        sourcemap = true;
        file = `${FILE_PREFIX}.min.js`;
        config.plugins.push(uglify());
    } else {
        file = `${FILE_PREFIX}.js`;
    }

    config.output = {
        ...output,
        file,
        sourcemap,
        compact
    };

    return config;
}
