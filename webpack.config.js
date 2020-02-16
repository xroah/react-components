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
    externals: {
        "react": "React",
        "react-dom": "ReactDOM",
        "react-router-dom": "ReactRouterDOM"
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
    plugins: []
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
    config.plugins.push(
        new HTMLWebpackPlugin({
            template: `./docs/index${isDev ? "-dev" : ""}.html`,
            hash: true
        })
    );

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
