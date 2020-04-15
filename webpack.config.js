const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HTMLWebpackPlugin = require("html-webpack-plugin");
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");
const path = require("path");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const { BundleAnalyzerPlugin } = require("webpack-bundle-analyzer");

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
};

const config = {
    mode: "production",
    entry: "./docs/index.tsx",
    stats: "minimal",
    output: {
        path: `${__dirname}/docs-dist`,
        filename: "js/index.js",
        chunkFilename: "js/[id].[name].js",
        publicPath: "/"
    },
    resolve: {
        extensions: [".js", ".ts", ".jsx", ".tsx"],
        alias: {
            "reap-ui$": path.resolve("./components/index.ts")
        }
    },
    module: {
        rules: [
            {
                test: /\.[jt]sx?$/,
                use: "babel-loader"
            }, {
                test: /\.(png|jgp|svg)$/,
                use: [{
                    loader: "url-loader",
                    options: {
                        limit: 8192
                    }
                }]
            }
        ]
    },
    plugins: [
        new HTMLWebpackPlugin({
            title: "reap-ui--Bootstrap components built with React",
            meta: {viewport: "width=device-width, initial-scale=1"},
            hash: true,
            favicon: "./docs/assets/logo.png"
        })
    ]
};

module.exports = env => {
    const isDev = env === "development";
    const cssLoader = {
        test: /\.s?css$/,
        use: [
            isDev ? "style-loader" : MiniCssExtractPlugin.loader,
            "css-loader",
            "sass-loader"
        ]
    };

    if (isDev) {
        config.devServer = {
            contentBase: "./docs-dist",
            hot: true,
            port: 8008,
            open: "http://localhost:8008",
            inline: true,
            historyApiFallback: true,
            host: "0.0.0.0"
        };
        config.mode = env;
        config.devtool = "eval-source-map";
    } else {
        config.plugins.push(
            new MiniCssExtractPlugin({
                filename: "css/style.css"
            }),
            new CleanWebpackPlugin(),
            new BundleAnalyzerPlugin()
        );
        config.optimization = {
            ...optimization,
            splitChunks: {
                minSize: 150 * 1024,
                maxSize: 200 * 1024,
                cacheGroups: {
                    vendors: {
                        test: /[\\/]node_modules[\\/]/,
                        name: "vendors",
                        chunks: "all"
                    },
                    commons: {
                        minChunks: 2,
                        name: "commons"
                    }
                }
            }
        };
    }
    config.module.rules.push(cssLoader);

    return config;
};
