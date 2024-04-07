import { useQueries, useQuery, keepPreviousData } from "@tanstack/react-query";
import { FilterStore } from "../../Context/Stores/FiltrationStore";
import { getAllTableData } from "../useLoadAllData";
import { useDeferredValue, useMemo } from "react";
import { queryClient } from "../..";
import { useFilterContext } from "../useFilterContext";
import { StpData } from "../../Components/StpTableView/StpDataTable";

export function useQueryFiltersLoader(querySearch?: string) {
    const { filters, search } = useFilterContext()
    const { cams, depth, tags } = filters;

    const deffered = useDeferredValue(search.query)
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
        queryFn: () => getAllTableData(),
        select: (data) => filters.applyFilters(querySearchFilter(data, deffered)),
        // select: (data) => deffered ? queryfilter(filters.applyFilters(data), deffered) : filters.applyFilters(data),
        gcTime: 2000,
        placeholderData: keepPreviousData,
        notifyOnChangeProps: ['data', 'refetch', 'status']

    },
        queryClient)
    return context
}
export function useQuerySeparateFilterLoader() {
    const { filters, search } = useFilterContext()
    const { cams, depth, tags } = filters;
    const { query } = search

    const context = useQueries({
        queries: [
            {
                queryKey: ['stp', { cams }],
                queryFn: () => getAllTableData(),
                select: (data) => filters.applyFilters(data as unknown as StpData[]),
                gcTime: 2000,
            },
            {
                queryKey: ['stp', { depth }],
                queryFn: () => getAllTableData(),
                select: (data) => filters.applyFilters(data as unknown as StpData[]),
                gcTime: 2000,
            },
            {
                queryKey: ['stp', { tags }],
                queryFn: () => getAllTableData(),
                select: (data) => filters.applyFilters(data as unknown as StpData[]),
                gcTime: 2000,
            },
            {
                queryKey: ['stp', { query }],
                queryFn: () => getAllTableData(),
                select: (data) => querySearchFilter(data as StpData[], query),
                gcTime: 2000,
            },
        ],

    }, queryClient)
    return context

}
function querySearchFilter<T extends { name: string }>(items: T[], query?: string) {
    if (!query || query === "") return items
    return items.filter(i => i.name.toLowerCase().includes(query.toLowerCase()))
}