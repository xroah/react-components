import {Server, ConfigOptions, config} from "karma"
import {LOG_INFO} from "karma/lib/constants"

const cfg: ConfigOptions = {
    port: 9876,
    basePath: "",
    singleRun: true,
    reporters: ["progress", "karma-typescript", "coverage"],
    browsers: ["Chrome"],
    browserDisconnectTimeout: 0,
    frameworks: ["jasmine", "karma-typescript"],
    concurrency: Infinity,
    colors: true,
    logLevel: LOG_INFO,
    files: [
        "src/**/*.ts?(x)",
        "tests/**/*.spec.ts?(x)"
    ],
    exclude: [
        "**/*.d.ts",
        "node_modules"
    ],
    preprocessors: {
        "tests/**/*.ts?(x)": "karma-typescript",
        "src/**/*.ts?(x)": ["karma-typescript", "coverage"]
    },
    coverageReporter: {
        type: "html",
        dir: "coverage/"
    },
    karmaTypescriptConfig: {
        compilerOptions: {
            esModuleInterop: true
        }
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