import { useCallback, useMemo } from "react";
import { StpData } from "../Components/DataTable/StpDataTable";
import { StpItem, StpTags } from "../Components/StpTable/TableObjects";
import { _log } from "../Helpers/helpersFns";
const hasTags = (item: StpItem, tags: StpTags[]) => tags.length > 0
    ? tags.every(t => item.tags.includes(t))
    : false
export const hasCams = (cams: number[]) => <T extends { cams: number }>(item: T) => cams.includes(item.cams)
export const hasDepths = (depths: number[]) => <T extends { depth: number }>(item: T) => depths.includes(item.depth)
export function useMemoFilters<T extends StpData>(items: T[]) {

    const funcs = useCallback((search_prop: { cams?: number[], depth?: number[], tags?: StpTags[] }) => {
        const memoCams = (filter_cams: { cams?: number[] }) => items.filter(i => filter_cams.cams?.includes(i.cams))
        const memoDepth = ({ depth }: { depth?: number[] }) => items.filter(i => depth?.includes(i.depth))
        const memoTags = (tags: T['tags']) => items.filter(i => hasTags(i, tags))
        const ff = search_prop.cams ? memoCams({ ...search_prop }) : []
        const dd = search_prop.depth ? memoDepth({ depth: search_prop.depth }) : []
        const tt = search_prop.tags ? memoTags(search_prop.tags) : []
        return [ff, dd, tt]

    }, [items])


    return funcs
}
export type PropSearch<T, P extends keyof T> = T[P] extends Array<any> ? { key: P, search: T[P] } : { key: P, search: T[P][] }
type r = PropSearch<StpData, 'cams'>

// export const _filterProp = <T, P extends keyof T & string>(search_values: PropSearch<T, P>) => {
//     const { key, search } = search_values

//     return (items:T[])=>items.filter(i => search.includes(i[key]))
// }

const filterProp = <T>(prop: keyof T & string, values: (number)[]) => (item: T) => values.includes(item[prop] as number)


export const ReduceFilter = <T>(items: T[], searchFilter: { cams: number[], depth: number[], tags: StpTags[] }) => {

    const filters = []

    const { cams, depth, tags } = searchFilter
    if (cams.length > 0) filters.push(cams)
    if (depth.length > 0) filters.push(depth)
    if (tags.length > 0) filters.push(tags)

    _log(filters)
}
