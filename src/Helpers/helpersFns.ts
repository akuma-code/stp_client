
import { v4 } from "uuid"
import { AnyObj } from "../Interfaces/Types"

export const _ID = () => v4().slice(0, 4)
export const _log = console.log
export const _toJSON = (o: AnyObj) => JSON.parse(JSON.stringify(o, null, 2))

export const _styleSet = (...args: string[]): string => {
    return args.join(' ')
}

export const _promptVar = (msg: string) => prompt(msg) ?? ""
export const _isArr = (obj: any): obj is any[] => Array.isArray(obj)