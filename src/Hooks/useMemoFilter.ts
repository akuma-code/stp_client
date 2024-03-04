import { useCallback, useMemo } from "react";
import { StpData } from "../Components/DataTable/StpDataTable";
import { StpItem, StpTags } from "../Components/StpTable/TableObjects";
const hasTags = (item: StpItem, tags: StpTags[]) => tags.length > 0
    ? tags.every(t => item.tags.includes(t))
    : false
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