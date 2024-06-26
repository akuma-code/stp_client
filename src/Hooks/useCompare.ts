import { useDeferredValue, useMemo } from "react";
import { StpData } from "../Components/StpTableView/StpDataTable";
import { StpItem, StpTag } from "../Components/StpTable/TableObjects";
import { AnyObj, FiltersParams } from "../Interfaces/Types";
import { _log } from "../Helpers/helpersFns";

// import { hasCams, hasDepths } from "./useMemoFilter";

type Order = 'asc' | 'desc';
type TSort = { [key: string]: string | number }

const hasTags = (tags: StpTag[]) => (item: StpItem) => tags.length > 0
    ? tags.every(t => item.tags.includes(t))
    : false
export const hasCams = (cams: number[]) => <T extends { cams: number }>(item: T) => cams.includes(item.cams)
export const hasDepths = (depths: number[]) => <T extends { depth: number }>(item: T) => depths.includes(item.depth)



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

export function getComparator<Key extends keyof AnyObj>(order: Order, orderBy: Key): TCompareFn<Key> {
    return order === 'desc'
        ? (a, b) => descendingComparator(a, b, orderBy)
        : (a, b) => -descendingComparator(a, b, orderBy);
}



export function stableSort<T>(array: T[], comparator: (a: T, b: T) => number) {
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
// const hasTags = (tags: StpTag[]) => (item: StpItem,) => tags.length > 0
//     ? tags.every(t => item.tags.includes(t))
//     : false
export const _FilterFns = {
    cams: hasCams,
    depth: hasDepths,
    tags: hasTags
}

export function useCompare<T extends AnyObj>(array: T[], order: Order, sort_field: any) {  //___useCompare

    // console.time("filter")
    const sorted = useMemo(() => stableSort(array, getComparator(order, sort_field)), [array, order, sort_field])
    // console.timeEnd('filter')

    return sorted
}

type FilterFnOrder = { [Key in keyof StpData]?: (item: Partial<StpData>) => boolean }
export const getKeyValue = <T extends AnyObj>(obj: T) => Object.entries(obj)[0] satisfies [keyof T, T[keyof T]]


const getFilters = (restFilters: Partial<FiltersParams>) => Object.entries(restFilters).reduce((acc, [k, v]) => {
    if (Array.isArray(v) && v.length > 0) acc.push({ [k]: _FilterFns[k as keyof typeof _FilterFns](v as any[]) })
    return acc
}, [] as FilterFnOrder[])



function propInclude<T>(prop: keyof T, cond: any[]) {
    return (item: T, idx?: number, arr?: T[]) => cond.includes(item[prop])
}
export function useStpFilter<T extends AnyObj>(array: T[] | undefined, query: string, restFilters: Partial<FiltersParams>) {



    const { cams, depth, tags } = restFilters


    const filtered = useMemo(() => {
        const init_items = array ? array.slice() as unknown as StpData[] : []
        const filterOrder = getFilters({ cams, depth, tags })
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
        } else result_items = init_items as unknown as StpData[]

        const filtered_items = [...result_items].filter(item => item.name.toLowerCase().includes(query.toLowerCase()))
        return filtered_items

    }, [array, cams, depth, tags, query])
    // _log([cams, depth, init_items, query, tags])
    return filtered
}






