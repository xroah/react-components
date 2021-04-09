import {Server, ConfigOptions, config} from "karma"
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
        "tests/**/*.spec.ts?(x)"
    ],
    exclude: [
        "**/*.d.ts"
    ],
    preprocessors: {
        "tests/**/*.ts?(x)": "karma-typescript",
        "src/**/*.ts?(x)": ["karma-typescript", "coverage"]
    }
} as ConfigOptions

config.parseConfig(
    null,
    cfg,
    {promiseConfig: true}
).then(karmaCfg => {
    const server = new Server(karmaCfg, exitCode => {
        console.log(`Karma has exited with ${exitCode}`)
        process.exit(exitCode)
    })

    server.start()
})