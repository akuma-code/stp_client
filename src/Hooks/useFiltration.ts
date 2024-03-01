import { useCallback, useMemo, useState } from "react";
import { StpData } from "../Components/DataTable/StpDataTable";
import { StpItem, StpTags } from "../Components/StpTable/TableObjects";
import { _isArr } from "../Helpers/helpersFns";

export type FiltersParams = {
    tags: StpTags[],
    depth: number[],
    cams: number[]
}
export type ItemFilteringProps = { depth: number, name: string, tags: StpTags[], cams: number, id: number }

const hasTags = (item: StpItem, tags: StpTags[]) => tags.length > 0
    ? tags.every(t => item.tags.includes(t))
    : false

type SearchPropsArr<T extends StpData> = { [P in keyof T]?: Array<T[P]> }
type tt = SearchPropsArr<StpData>
const includeValue = <T extends StpData>(item: T[], search: tt) => {
    const { cams, depth, tags } = search
    const arr = [cams, depth, tags]

    return
}

export function useCombinedFilter<T extends StpData>(items: T[], cams: FiltersParams['cams'], depths: FiltersParams['depth'], tags: FiltersParams['tags']) {
    // const { cams, depths, tags, query } = params
    const s = { cams: [1, 2], depth: [28, 36] } satisfies SearchPropsArr<StpData>
    includeValue(items, s)

    const filtered = useMemo(() => {
        const camsIds = items

        const depthIds = items
        const tagIds = items.filter(item => hasTags(item, tags))


        const combine = [camsIds.map(i => i.name), depthIds.map(i => i.name), tagIds.map(i => i.name)]
        const foiundedIds = [...camsIds, ...depthIds, ...tagIds,]




        const result = items.filter(i => foiundedIds.indexOf(i) > -1)

        const noFilter = tags.length === 0
        if (noFilter) {

            return items
        }
        return result
    }, [cams, depths, items, tags])
    return filtered


}







const ccEq = (arr1: number[], arr2: number[]) => {
    if (arr2.length === 0) return arr1
    const res = arr2.concat(arr1.filter(n1 => !arr2.includes(n1)))
    return res
}










type FilterByName<T extends keyof FiltersParams> = {
    type: T,
    payload: string
}
type FilterByTags<T extends keyof FiltersParams> = {
    type: 'tags',
    payload: StpTags[]
}
type FilterByDepth<T extends keyof FiltersParams> = {
    type: 'depths',
    payload: number[]
}
type FilterByCams<T extends keyof FiltersParams> = {
    type: 'cams',
    payload: number[]
}

export type Filters = | FilterByTags<'tags'> | FilterByDepth<'depth'> | FilterByCams<'cams'>

