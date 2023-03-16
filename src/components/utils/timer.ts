class Timer {
    private _id = -1
    constructor(
        private _timeout: number,
        private _callback?: VoidFunction
    ) { }

    set callback(callback: VoidFunction) {
        this._callback = callback
    }

    set timeout(timeout: number) {
        this._timeout = timeout
    }

    clear() {
        if (this._id !== -1) {
            window.clearTimeout(this._id)

            this._id = -1
        }
    }

    delay(clear = true) {
        if (clear) {
            this.clear()
        }

        this._id = window.setTimeout(
            () => {
                this._id = -1
                this._callback?.()
            },
            this._timeout
        )
    }
}

export default Timer