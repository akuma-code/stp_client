import { Order } from "../Components/DataTable/StpDataTable";
import { AnyObj, FiltersParams } from "../Interfaces/Types";
import { useCompare, useStpFilter } from "./useCompare";





export function useCombineFilterSort<T extends AnyObj>(array: T[], query: string, restFilters: Partial<FiltersParams>, order: Order, sort_field: any) {
    const filtered = useStpFilter(array, query, restFilters)

    const sorted = useCompare(filtered, order, sort_field)
    return sorted
}