import {Server, ConfigOptions} from "karma"
import {LOG_INFO} from "karma/lib/constants"

const cfg: ConfigOptions = {
    port: 9876,
    basePath: "",
    singleRun: true,
    reporters: ["progress", "coverage"],
    browsers: ["Chrome"],
    browserDisconnectTimeout: 0,
    frameworks: ["jasmine", "karma-typescript"],
    concurrency: Infinity,
    colors: true,
    logLevel: LOG_INFO,
    coverageReporter: {
        type: "html",
        dir: "coverage/"
    },
    files: [
        "src/**/*.ts?(x)",
        "tests/**/*.spec.ts"
    ],
    preprocessors: {
        "src/**/*.ts?(x)": "coverage",
        "**/*.ts?(x)": "karma-typescript"
    }
} as ConfigOptions

const server = new Server(cfg)

server.start()