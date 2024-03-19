import { Order } from "../Components/StpTableView/StpDataTable";
import { AnyObj, FiltersParams } from "../Interfaces/Types";
import { getComparator, stableSort, useCompare, useStpFilter } from "./useCompare";





export function useCombineFilterSort<T extends AnyObj>(array: T[], query: string, restFilters: Partial<FiltersParams>, order: Order, sort_field: any) {
    const filtered = useStpFilter(array, query, restFilters)
    // const sorted = useCompare(filtered, order, sort_field)
    const _sorted = stableSort<T>(filtered as unknown as T[], getComparator(order, sort_field))
    return _sorted
}