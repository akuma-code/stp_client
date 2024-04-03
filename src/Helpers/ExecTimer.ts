import { _ID, _log } from "./helpersFns"

export class _TimerExec {
    start: number | undefined = undefined
    end: number | undefined = undefined
    createdAt: number
    saved: number[] = []
    id: string | undefined
    constructor(name?: string) {
        this.id = name ? name : _ID()
        this.createdAt = Date.now()
        console.time('timer')
    }

    go() {
        this.start = Date.now()
        console.timeStamp('started')
        // console.time('timer')
    }
    stop(msg?: string) {
        if (!this.start) return _log("start point not defined")
        this.end = Date.now()

        const diff = this.end - this.start
        const diffCreate = this.end - this.createdAt
        this.saved.push(diff)
        const message = msg ? msg : `timer(${this.id}), execution time: `
        console.timeEnd("timer")
        console.log(message, diff)

    }


}