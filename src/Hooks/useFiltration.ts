import { useCallback, useMemo, useState } from "react";
import { StpData } from "../Components/DataTable/StpDataTable";
import { StpItem, StpTag } from "../Components/StpTable/TableObjects";
import { _isArr } from "../Helpers/helpersFns";

export type FiltersParams = {
    tags: StpTag[],
    depth: number[],
    cams: number[]
}
export type ItemFilteringProps = { depth: number, name: string, tags: StpTag[], cams: number, id: number }

const hasTags = (item: StpItem, tags: StpTag[]) => tags.length > 0
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
        // console.log('combine', result)
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



export type TSearchProp<T> = { [Key in keyof T]?: T[Key] extends Array<any> ? T[Key] : T[Key][] }
type StpFilters = Pick<TSearchProp<StpData>, 'cams' | 'depth' | 'tags'>

export function useFilterReduce<T>(
    items: T[],
    filterOrder: (keyof T)[],
    ...args: StpFilters[]
) {
    if (args) {



        const filtered = items
        return filtered
    }
}


const filterFn = <T, P extends keyof T>(items: T[], search_prop: TSearchProp<T>) => {
    const [prop_name, prop_value] = Object.entries(search_prop) as [P, T[P]]
    const filtered = items.filter(item => item[prop_name] === prop_value)
    return filtered
}



type FilterByName<T extends keyof FiltersParams> = {
    type: T,
    payload: string
}
type FilterByTags<T extends keyof FiltersParams> = {
    type: 'tags',
    payload: StpTag[]
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

