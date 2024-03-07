import { AnyObj } from "../Interfaces/Types";
import { useMap } from "./useObjectMap";

export function useMinMaxProps<T extends { [key: string]: any }>(items: T[]) {

    const num_items = items.map(item => getNumericProps(item))
    // const nn = num_items.reduce((acc, is, idx) => {
    //     const arr: number[] = []
    //     is.forEach((i) => {
    //         const [key] = Object.keys(i)


    //         const tmp = acc[key][idx]
    //         console.log('arr', tmp)
    //         // acc = { ...acc, [key]: [tmp, i[key]] }
    //     })



    //     return acc
    // }, {} as { [Key in keyof T]: number[] })


    // console.log('num_items', nn)

    return num_items
}


const getNumericProps = <T extends { [key: string]: any }>(item: T) => {
    const nums = Object.entries(item).map(([key, value]) => {
        if (typeof value === 'number') return { [key]: value }
        else return null
    })
    return nums.filter(n => !!n) as unknown as { [key: string]: number }[]
}