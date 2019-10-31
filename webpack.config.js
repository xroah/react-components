const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HTMLWebpackPlugin = require("html-webpack-plugin");
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");

const optimization = {
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
}

const config = {
    mode: "production",
    entry: "./docs/index.tsx",
    stats: "minimal",
    output: {
        path: `${__dirname}/docs-dist`,
        filename: "bundle.js",
        publicPath: "/"
    },
    resolve: {
        extensions: [".js", ".ts", ".jsx", ".tsx"]
    },
    module: {
        rules: [
            {
                test: /\.[jt]sx?$/,
                use: "babel-loader"
            }
        ]
    },
    plugins: [
        new HTMLWebpackPlugin({
            title: "React Bootstrap",
            hash: true
        })
    ]
};

module.exports = env => {
    const isDev = env === "development";
    const cssLoader = {
        test: /\.css$/,
        use: [
            isDev ? "style-loader" : MiniCssExtractPlugin.loader,
            "css-loader"
        ]
    };

    if (isDev) {
        config.devServer = {
            contentBase: "./docs-dist",
            hot: true,
            port: 8008,
            open: true,
            inline: true,
            historyApiFallback: true
        };
        config.mode = env;
        config.optimization = optimization;
    } else {
        config.plugins.push(
            new MiniCssExtractPlugin({
                filename: "style.css"
            })
        );
    }
    config.module.rules.push(cssLoader);

    return config;
};
