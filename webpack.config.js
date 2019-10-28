const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HTMLWebpackPlugin = require("html-webpack-plugin");
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");

module.exports = {
    mode: "production",
    entry: "./docs/index.tsx",
    stats: "errors-only",
    optimization: {
        minimizer: [
            new TerserPlugin({
                terserOptions: {
                    output: {
                        comments: false
                    }
                },
                extractComments: false,
            }),
            new OptimizeCSSAssetsPlugin()
        ]
    },
    output: {
        path: `${__dirname}/docs-dist`,
        filename: "bundle.js"
    },
    resolve: {
        extensions: [".js", ".ts", ".jsx", ".tsx"]
    },
    module: {
        rules: [
            {
                test: /\.[jt]sx?$/,
                use: "babel-loader"
            },{
                test: /\.css$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    "css-loader"
                ]
            }
        ]
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: "style.css"
        }),
        new HTMLWebpackPlugin({
            title: "React Bootstrap",
            hash: true
        })
    ],
    devServer: {
        contentBase: "./docs-dist",
        hot: true,
        port: 8008,
        open: true,
        inline: true
    }
};