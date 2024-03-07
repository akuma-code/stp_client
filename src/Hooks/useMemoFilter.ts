import { useCallback, useMemo, useState } from "react";
import { StpData } from "../Components/DataTable/StpDataTable";
import { StpItem, StpTag } from "../Components/StpTable/TableObjects";
import { _log } from "../Helpers/helpersFns";
const hasTags = (tags: StpTag[]) => (item: StpItem) => tags.length > 0
    ? tags.every(t => item.tags.includes(t))
    : false
export const hasCams = (cams: number[]) => <T extends { cams: number }>(item: T) => cams.includes(item.cams)
export const hasDepths = (depths: number[]) => <T extends { depth: number }>(item: T) => depths.includes(item.depth)

export const _FilterFns = {
    cams: hasCams,
    depth: hasDepths,
    tags: hasTags
}


export type _FilterFnKeys = keyof typeof _FilterFns
type FilterPropFn<T> = (itemProp: Partial<T>) => boolean


type MFuncArgs = { cams?: number[], depth?: number[], tags?: StpTag[] }
export function useMemoFilters<T extends StpData>(items: T[], searchProps: MFuncArgs) {
    const [filterOrder, setFilterOrder] = useState<MFuncArgs>({ ...searchProps })

    const { cams, depth, tags } = searchProps
    const funcs = useMemo(() => {
        // const memoCams = (cams:number[]) => items.filter(i => cams.includes(i.cams))
        // const memoDepth = (depths:number[]) => items.filter(i => depths.includes(i.depth))
        // const memoTags = (tags: T['tags']) => items.filter(i => hasTags(i, tags))
        const fcams = cams ? items.filter(hasCams(cams)) : []
        const fdepths = depth ? items.filter(hasCams(depth)) : []
        const ftags = tags ? items.filter(item => hasTags(tags)) : []

        return [fcams, fdepths, ftags] as const

    }, [cams, depth, items, tags])



    return [cams, tags] as const

}
export type PropSearch<T, P extends keyof T> = T[P] extends Array<any> ? { key: P, search: T[P] } : { key: P, search: T[P][] }
type r = PropSearch<StpData, 'cams'>

// export const _filterProp = <T, P extends keyof T & string>(search_values: PropSearch<T, P>) => {
//     const { key, search } = search_values

//     return (items:T[])=>items.filter(i => search.includes(i[key]))
// }
type FiltersArrayElement = {
    cams?: number[]
    depth?: number[]
    tags?: StpTag[]
}
const filterProp = <T>(prop: keyof T & string, values: (number)[]) => (item: T) => values.includes(item[prop] as number)
const ArrayFilter = <T>(items: T[], filter: FiltersArrayElement) => {


}

export const ReduceFilter = <T>(searchFilter: { cams: number[], depth: number[], tags: StpTag[] }) => {

    let filters: (Partial<typeof searchFilter>)[] = []

    const { cams, depth, tags } = searchFilter
    if (cams.length > 0) filters = [...filters, { cams: cams }]
    if (depth.length > 0) filters = [...filters, { depth: depth }]
    if (tags.length > 0) filters = [...filters, { tags: tags }]

    _log(filters)


}

