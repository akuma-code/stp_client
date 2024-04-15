import { QueryClient, keepPreviousData, useQueries, useQuery } from "@tanstack/react-query";
import { useCallback, useDeferredValue } from "react";
// import { queryClient } from "../..";
import { StpData } from "../../Components/StpTableView/StpDataTable";
import { useFilterContext } from "../useFilterContext";
import { getAllTableData } from "../useLoadAllData";
import { indexQueryClient } from "../..";

export type SelectFn = <T>(args: T[]) => T[]
export function useQueryFiltersLoader(qc?: QueryClient) {
    const { filters, search } = useFilterContext()
    const { cams, depth, tags } = filters;
    const deffered = useDeferredValue(search.query)
    const client = qc ? qc : indexQueryClient

    const selectFn = useCallback((data: StpData[]) => {
        const items = querySearchFilter(data, deffered)
        return filters.applyFilters(items)
    }, [deffered, filters])

    const context = useQuery({
        queryKey: [
            'stp_data',
            'filters',
            cams,
            depth,
            tags,
            deffered
        ],
        queryFn: getAllTableData,
        select: selectFn,
        placeholderData: keepPreviousData,
    },
        client)
    return context
}
export function useQuerySelectedIdsLoader({ selectedIds, filterFn }: { selectedIds: number[], filterFn?: SelectFn }) {


    const selectFn = useCallback((data: StpData[]) => data.filter(d => selectedIds.includes(d.id)), [selectedIds])
    const context = useQuery({
        queryKey: [
            'stp_data',
            'selected',
            selectedIds
        ],
        queryFn: getAllTableData,
        select: filterFn ? filterFn : selectFn,

        gcTime: 2000,
        placeholderData: keepPreviousData,
        enabled: !!selectedIds


    },
        indexQueryClient)
    return context

}
function querySearchFilter<T extends { name: string }>(items: T[], query?: string) {
    if (!query || query === "") return items
    return items.filter(i => i.name.toLowerCase().includes(query.toLowerCase()))
}