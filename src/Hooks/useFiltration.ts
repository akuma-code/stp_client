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


    const filtered = useMemo(() => {
        const camsset = new Set<number[]>()
        const depthset = new Set<number[]>()
        cams.forEach((cam) => {

            const finded = items.filter(i => i.cams === cam)
            camsset.add(finded.map(f => f.id))

        })
        const camsIds = Array.from(camsset.values())
        depths.forEach((depth) => {

            const finded = items.filter(i => i.depth === depth)
            depthset.add(finded.map(f => f.id))

        })
        const depthIds = depthset.values()
        const tagIds = items.filter(item => hasTags(item, tags)).map(item => item.id)


        const combine = [...camsIds, ...depthIds, ...tagIds]
        const foiundedIds = [...combine]



        const result = items.filter(i => foiundedIds.includes(i.id))
        console.log('combine', result)
        // const result = foiundedIds.map(id=>filterProp(items, 'id', id))

        const noFilter = tags.length === 0
        if (noFilter) {

            return items
        }
        return result
    }, [cams, depths, items, tags])
    return filtered


}

const _compareProp = <T extends StpData, P extends keyof T>(item: T, searchProp: P, searchValue: T[P]) => item[searchProp] === searchValue

function filterProp<T extends StpData, P extends keyof T>(items_array: T[], searchProp: P, searchValue: T[P]) {
    return [...items_array].filter(item => _compareProp(item, searchProp, searchValue))

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

