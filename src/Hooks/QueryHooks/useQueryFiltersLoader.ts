import { useQuery } from "@tanstack/react-query";
import { FilterStore } from "../../Context/Stores/FiltrationStore";
import { getAllTableData } from "../useLoadAllData";
import { useDeferredValue } from "react";

export function useQueryFiltersLoader(filters: FilterStore, querySearch?: string) {
    const { cams, depth, tags } = filters;
    const deffered = useDeferredValue(querySearch)

    const context = useQuery({
        queryKey: ['stp_data', cams, depth, tags, deffered],
        queryFn: () => getAllTableData(),
        select: (data) => queryfilter(filters.applyFilters(data), deffered),
        gcTime: 2000
    })
    return context
}

function queryfilter<T extends { name: string }>(items: T[], query?: string) {
    if (!query) return items
    return items.filter(i => i.name.toLowerCase().includes(query.toLowerCase()))
}