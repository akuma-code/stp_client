import { StpData } from "../Components/StpTableView/StpDataTable";
import { _log } from "../Helpers/helpersFns";
import { AnyObj } from "../Interfaces/Types";
import { getKeyValue } from "./useCompare";
import { useMap } from "./useObjectMap";
export type _ArraishProp<T> = { [P in keyof T]: T[P][] }
export function useMinMaxProps<T extends Partial<StpData>>(items: T[]) {

    const a = items.map(arrayProp)
    // console.log('a', a)


}


const getNumericProps = <T extends { [key: string]: any }>(item: T) => {
    const nums = Object.entries(item).map(([key, value]) => {
        if (typeof value === 'number') return { [key]: value }
        else return null
    })
    return nums.filter(Boolean)
}

const arrayProp = <T extends Partial<StpData>>(item: T, idx?: number) => {
    const keys = Object.keys(item) as (keyof T)[]
    const itemArr = keys.map((key) => ({ [key]: [item[key]] }))
    const result = itemArr.reduce((acc, item, idx) => {
        const [k, v] = getKeyValue(item)
        // if (!acc) acc = { [k]: v }
        acc = { ...acc, [k]: v }
        // acc[k].push(...v)
        return acc
    })
    let p = {} as T
    for (let i = 0; i < itemArr.length; i++) {
        p = { ...p, [i]: itemArr[i] }
    }
    // console.log('p', p)
}



