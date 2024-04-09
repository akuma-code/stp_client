import { keepPreviousData, useQueries, useQuery } from "@tanstack/react-query";
import { useCallback, useDeferredValue } from "react";
import { queryClient } from "../..";
import { StpData } from "../../Components/StpTableView/StpDataTable";
import { useFilterContext } from "../useFilterContext";
import { getAllTableData } from "../useLoadAllData";

export function useQueryFiltersLoader() {
    const { filters, search } = useFilterContext()
    const { cams, depth, tags } = filters;
    const deffered = useDeferredValue(search.query)
    // const cachedData = useCallback((data: StpData[]) => querySearchFilter(data, deffered), [deffered])
    const selectFn = useCallback((data: StpData[]) => {
        const items = querySearchFilter(data, deffered)
        return filters.applyFilters(items)
    }, [deffered, filters])
    // const placeholder = useMemo(()=>{

    // })
    const context = useQuery({
        queryKey: [
            'stp_table_data',
            cams,
            depth,
            tags,
            deffered
        ],
        queryFn: getAllTableData,
        select: selectFn,

        gcTime: 2000,
        placeholderData: keepPreviousData,
        enabled: !!cams || !!depth || !!tags || !!deffered

    },
        queryClient)
    return context
}
export function useQuerySelectedIdsLoader(selectedIds: number[]) {


    const selectFn = useCallback((data: StpData[]) => data.filter(d => selectedIds.includes(d.id)), [selectedIds])
    const context = useQuery({
        queryKey: [
            'stp_table_data_selected',
            selectedIds
        ],
        queryFn: getAllTableData,
        select: selectFn,

        gcTime: 2000,
        placeholderData: keepPreviousData,


    },
        queryClient)
    return context

}
function querySearchFilter<T extends { name: string }>(items: T[], query?: string) {
    if (!query || query === "") return items
    return items.filter(i => i.name.toLowerCase().includes(query.toLowerCase()))
}