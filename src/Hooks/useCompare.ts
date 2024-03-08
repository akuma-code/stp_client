import { useEffect, useMemo, useState } from "react";
import { StpData } from "../Components/DataTable/StpDataTable";
import { StpItem, StpTag } from "../Components/StpTable/TableObjects";
import { AnyObj } from "../Interfaces/Types";
import { FiltersParams } from "./useFiltration";
import { hasCams, hasDepths } from "./useMemoFilter";

type Order = 'asc' | 'desc';
type TSort = { [key: string]: string | number }


function descendingComparator<T>(a: T, b: T, orderBy: keyof T) {
    if (b[orderBy] < a[orderBy]) {
        return -1;
    }
    if (b[orderBy] > a[orderBy]) {
        return 1;
    }
    return 0;
}

type TCompareItem<Key extends keyof AnyObj> = { [key in Key]: number | string }
type TCompareFn<Key extends keyof AnyObj> = (a: TCompareItem<Key>, b: typeof a) => number

function getComparator<Key extends keyof AnyObj>(order: Order, orderBy: Key): TCompareFn<Key> {
    return order === 'desc'
        ? (a, b) => descendingComparator(a, b, orderBy)
        : (a, b) => -descendingComparator(a, b, orderBy);
}



function stableSort<T>(array: readonly T[], comparator: (a: T, b: T) => number) {
    const stabilizedThis = array.map((el, index) => [el, index] as [T, number]);
    stabilizedThis.sort((a, b) => {
        const order = comparator(a[0], b[0]);
        if (order !== 0) {
            return order;
        }
        return a[1] - b[1];
    });
    return stabilizedThis.map((el) => el[0]);
}
const hasTags = (tags: StpTag[]) => (item: StpItem,) => tags.length > 0
    ? tags.every(t => item.tags.includes(t))
    : false
export const _FilterFns = {
    cams: hasCams,
    depth: hasDepths,
    tags: hasTags
}
type FilterByName = {
    type: 'name',
    payload: string
}
type FilterByTags = {
    type: 'tags',
    payload: StpTag[]
}
type FilterByDepth = {
    type: 'depth',
    payload: number
}
type FilterByCams = {
    type: 'cams',
    payload: number
}

export type FiltrationType = | FilterByName | FilterByTags | FilterByDepth | FilterByCams
export type FilterItemParams = { depth: number, name: string, tags: StpTag[], cams: number }

function filtrationReducer<T extends FilterItemParams>(array: T[], filter: FiltrationType) {
    const filterName = (query: string) => array.filter(item => item.name.toLowerCase().includes(query.toLowerCase()))
    // const filterTags = (tags: StpTags[]) => tags.length > 0 ? [...array].filter(hasTags(tags)) : [...array]
    const filterDepth = (depth: number) => array.filter(item => item.depth === depth)
    const filterCams = (cams: number) => array.filter(item => item.cams === cams)
    switch (filter.type) {
        case "name": return filterName(filter.payload)
        // case "tags": return filterTags(filter.payload)
        case "depth": return filterDepth(filter.payload)
        case "cams": return filterCams(filter.payload)
    }


}


// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function useCompare<T extends AnyObj>(array: T[], order: Order, sort_field: any) {
    const sorted = useMemo(() => stableSort(array, getComparator(order, sort_field)), [order, sort_field, array])

    return sorted
}

type FilterFnOrder = { [Key in keyof StpData]?: (item: Partial<StpData>) => boolean }
export const getKeyValue = <T extends AnyObj>(obj: T) => Object.entries(obj)[0] satisfies [keyof T, T[keyof T]]
const getFilters = (restFilters: Partial<FiltersParams>) => Object.entries(restFilters).reduce((acc, [k, v]) => {
    if (Array.isArray(v) && v.length > 0) acc.push({ [k]: _FilterFns[k as keyof typeof _FilterFns](v as any[]) })
    return acc
}, [] as FilterFnOrder[])


export function useSortAndFilter<T extends AnyObj>(array: T[], order: Order, sort_field: any, query: string, restFilters: Partial<FiltersParams>) {

    const init_items = array.slice() as unknown as StpData[]

    const filtered = useMemo(() => {
        const filterOrder = getFilters(restFilters)
        let result_items = [] as StpData[]

        const fnOrder = filterOrder.reduce((acc, curr) => {
            const [_, fn] = getKeyValue(curr)
            acc.push(fn)
            return acc
        }, [] as FilterFnOrder[keyof FilterFnOrder][])

        if (fnOrder.length > 0) {
            const orderFiltered = fnOrder.reduce((res, fn, idx) => {
                if (idx === 0) {
                    const firstresult = init_items.filter(fn!)
                    res.push(...firstresult)
                    return res
                }
                return res.filter(fn!)
            }, [] as StpData[])
            result_items = orderFiltered
        }
        else result_items = init_items as unknown as StpData[]

        const filtered_items = [...result_items].filter(item => item.name.toLowerCase().includes(query.toLowerCase()))
        return filtered_items

    }, [init_items, query, restFilters])

    const sorted = useCompare(filtered as StpData[], order, sort_field)
    return sorted
}
export function useStpFilter<T extends AnyObj>(array: T[], query: string, restFilters: Partial<FiltersParams>) {





    const init_items = array.slice() as unknown as StpData[]
    const filtered = useMemo(() => {
        const filterOrder = getFilters(restFilters)

        const fnOrder = filterOrder.reduce((acc, curr) => {
            const [_, fn] = getKeyValue(curr)
            acc.push(fn)
            return acc
        }, [] as FilterFnOrder[keyof FilterFnOrder][])
        let result_items = [] as StpData[]
        if (fnOrder.length > 0) {
            const orderFiltered = fnOrder.reduce((res, fn, idx) => {
                if (idx === 0) {
                    const firstresult = init_items.filter(fn!)
                    res.push(...firstresult)
                    return res
                }
                return res.filter(fn!)
            }, [] as StpData[])
            result_items = orderFiltered
        } else result_items = init_items as unknown as StpData[]

        const filtered_items = [...result_items].filter(item => item.name.toLowerCase().includes(query.toLowerCase()))
        return filtered_items

    }, [init_items, query, restFilters])

    return filtered
}
export function useLazyDataLoad<T extends StpData>(array: T[], order: Order, sort_field: any, query: string, restFilters: Partial<FiltersParams>) {
    const [isLoading, setIsLoading] = useState(false)
    const data = useSortAndFilter(array, order, sort_field, query, restFilters)
    const [loadData, setLoadData] = useState<StpData[]>(data as unknown as StpData[])
    function load(data: { [x: string]: string | number }[]) {

        const p = new Promise<StpData[]>(() => data)
        return p

    }

    useEffect(() => {
        setIsLoading(true)
        load(data).then(d => setLoadData(d))

    }, [data])
    return [loadData, isLoading] as const
}

// export function useFilterTags<T extends AnyObj>(array: T[], order: Order, sort_field: any, tags: StpTags[], query: string) {

//     const sorted = useSortAndFilter(array, order, sort_field, query, {})

//     const tagged = useMemo(() => tags.length > 0 ? [...sorted].filter(i => hasTags(tags)(i as unknown as StpData)) : [...sorted],
//         [tags, sorted])

//     return tagged
// }

