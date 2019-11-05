// Karma configuration
// Generated on Mon Oct 28 2019 16:12:25 GMT+0800 (GMT+08:00)

module.exports = function (config) {
    config.set({

        // base path that will be used to resolve all patterns (eg. files, exclude)
        basePath: "./",


        // frameworks to use
        // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
        frameworks: ["mocha"],


        // list of files / patterns to load in the browser
        files: [
            "./test/index.ts"
        ],


        // list of files / patterns to exclude
        exclude: ["node_modules"],


        // preprocess matching files before serving them to the browser
        // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
        preprocessors: {
            "./test/index.ts": ["webpack"]
        },


        webpack: {
            mode: "production",
            stats: "minimal",
            resolve: {
                extensions: [".js", ".ts", ".jsx", ".tsx"]
            },
            module: {
                rules: [
                    {
                        test: /\.[jt]sx?$/,
                        use: "babel-loader"
                    },
                    {
                        test: /\.css$/,
                        use: [
                            "style-loader",
                            "css-loader"
                        ]
                    }
                ]
            }
        },

        // test results reporter to use
        // possible values: "dots", "progress"
        // available reporters: https://npmjs.org/browse/keyword/karma-reporter
        reporters: ["mocha", "coverage"],

        // optionally, configure the reporter
        coverageReporter: {
            dir: "coverage/"
        },

        // web server port
        port: 9876,


        // enable / disable colors in the output (reporters and logs)
        colors: true,


        // level of logging
        // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
        logLevel: config.LOG_INFO,


        // enable / disable watching file and executing tests whenever any file changes
        autoWatch: false,


        // start these browsers
        // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
        browsers: ["Chrome"],


        // Continuous Integration mode
        // if true, Karma captures browsers, runs the tests and exits
        singleRun: true,

        // Concurrency level
        // how many browser should be started simultaneous
        concurrency: Infinity,

        processKillTimeout: 0,
    })
};
