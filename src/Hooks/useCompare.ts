import { useCallback, useMemo } from "react";
import { StpData } from "../Components/DataTable/StpDataTable";
import { StpItem, StpTags } from "../Components/StpTable/TableObjects";
import { AnyObj } from "../Interfaces/Types";
import { useDebounceValue } from 'usehooks-ts'
import { _log } from "../Helpers/helpersFns";
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



function getComparator<Key extends keyof AnyObj>(
    order: Order,
    orderBy: Key,
): (
    a: { [key in Key]: number | string },
    b: { [key in Key]: number | string },
) => number {
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
const hasTags = (tags: StpTags[]) => (item: StpItem,) => tags.length > 0
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
    payload: StpTags[]
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
export type FilterItemParams = { depth: number, name: string, tags: StpTags[], cams: number }

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
const getKeyValue = <T extends AnyObj>(obj: T) => Object.entries(obj)[0] satisfies [keyof T, T[keyof T]]
const getFilters = (restFilters: Partial<FiltersParams>) => Object.entries(restFilters).reduce((acc, [k, v]) => {
    if (Array.isArray(v) && v.length > 0) acc.push({ [k]: _FilterFns[k as keyof typeof _FilterFns](v as any[]) })
    return acc
}, [] as FilterFnOrder[])

const applyFilter = (filter: FilterFnOrder) => {
    const ff = []
}
export function useSortAndFilter<T extends AnyObj>(array: T[], order: Order, sort_field: any, query: string, restFilters: Partial<FiltersParams>) {


    //* [{cams:[1,2]},{depth:[24,28]},...]
    const filterOrder = getFilters(restFilters)
    const fnOrder = filterOrder.reduce((acc, curr) => {
        const [key, fn] = getKeyValue(curr)
        acc.push(fn)
        return acc
    }, [] as FilterFnOrder[keyof FilterFnOrder][])

    console.log('fo', fnOrder)

    const filtered = useMemo(() => {
        const init_items = array as unknown as StpData[]
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
        }
        if (result_items.length > 0) return result_items.filter(item => {
            if ('name' in item) {
                return (typeof item.name === 'string') ? item.name.toLowerCase().includes(query.toLowerCase()) : false
            }
            else return []
        })
        return array.filter(item => {
            if ('name' in item) {
                return (typeof item.name === 'string') ? item.name.toLowerCase().includes(query.toLowerCase()) : false
            }
            else return []
        })

    }, [array, fnOrder, query])

    const sorted = useCompare(filtered as StpData[], order, sort_field)
    return sorted
}
export function useEnchancedFilter<T extends FilterItemParams>(array: T[], order: Order, sort_field: any, filter: FiltrationType) {

    const sorted = useCompare(array, order, sort_field) as unknown as T[]
    const filterCb = useCallback((filter_type: FiltrationType) => filtrationReducer(sorted, filter_type), [sorted])
    // const filtered = useMemo(() => {
    //     const cb = filtrationReducer(sorted as unknown as T[], filter)

    //     return cb

    // }, [sorted, filter])

    return filterCb(filter)
}

export function useFilterTags<T extends AnyObj>(array: T[], order: Order, sort_field: any, tags: StpTags[], query: string) {

    const sorted = useSortAndFilter(array, order, sort_field, query, {})

    const tagged = useMemo(() => tags.length > 0 ? [...sorted].filter(i => hasTags(tags)(i as unknown as StpData)) : [...sorted],
        [tags, sorted])

    return tagged
}

