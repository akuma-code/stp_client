import { useCallback, useEffect, useMemo, useState } from "react";
import { StpItem, StpTags } from "../Components/StpTable/TableObjects";
import { _isArr } from "../Helpers/helpersFns";
import { StpData } from "../Components/DataTable/StpDataTable";

export type FiltersParams = {
    depths: number[],
    query?: string,
    tags: StpTags[],
    cams: number[]
}
export type ItemFilteringProps = { depth: number, name: string, tags: StpTags[], cams: number, id: number }

const hasTags = (item: StpItem, tags: StpTags[]) => tags.length > 0
    ? tags.every(t => item.tags.includes(t))
    : false



export function useCombinedFilter<T extends StpData>(items: T[], cams: FiltersParams['cams'], depths: FiltersParams['depths'], tags: FiltersParams['tags']) {
    // const { cams, depths, tags, query } = params
    const filtered = useMemo(() => {
        const camsIds = items.filter(item => cams.indexOf(item.cams) > -1)
        const depthIds = items.filter(item => depths.indexOf(item.depth) > -1)
        const tagIds = items.filter(item => hasTags(item, tags))

        // const queryIds = query ? items.filter(item => item.name.toLowerCase().includes(query.toLowerCase())).map(i => i.id) : []
        const combine = [camsIds.map(i => i.name), depthIds.map(i => i.name), tagIds.map(i => i.name)]
        const foiundedIds = [...camsIds, ...depthIds, ...tagIds,]
        // const setIds = Array.from(new Set([...camsIds, ...depthIds, ...tagIds, ...queryIds]))
        // const combinedResult = combine.map(fresult=>[...fresult]).reduce((res, numbs) => {
        // }, [] as number[])
        // combine.map(idArr=>)

        console.log(Array.from(new Set(...combine).values()))
        console.log('camsIds', camsIds)
        console.log('depthIds', depthIds)
        console.log('tagIds', depthIds)



        const result = items.filter(i => foiundedIds.indexOf(i) > -1)

        const noFilter = (cams.length === 0 && depths.length === 0 && tags.length === 0)
        if (noFilter) {
            console.log('returned Items')
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










export function _useFiltration<T extends ItemFilteringProps>(items: T[], { cams, depths, query, tags }: FiltersParams) {
    const FQuery = useCallback((query: string) => items.filter(item => item.name.toLowerCase().includes(query.toLowerCase())).map(i => i.id), [items])
    const FTags = useCallback((tags: StpTags[]) => items.filter(s => hasTags(s as unknown as StpItem, tags)).map(i => i.id), [items])
    const FDepth = useCallback((depths: number[]) => items.filter(item => depths.includes(item.depth)).map(i => i.id), [items])
    const FCams = useCallback((cams: number[]) => items.filter(item => cams.includes(item.cams)).map(i => i.id), [items])
    const result = useMemo(() => {
        const clone = [...items].map(i => ({ ...i }))


        const filteredQuery = items.filter(i => FQuery(query!).includes(i.id))
        const filterTags = items.filter(i => FTags(tags).includes(i.id))
        const filterDepth = items.filter(i => FDepth(depths).includes(i.id))
        const filteredCams = items.filter(i => FCams(cams).includes(i.id))

        const proxy_result = [filteredQuery, filterTags, filterDepth, filteredCams].reduce((res, item) => {
            if (!res) return []
            if (_isArr(item)) res = [...res, ...item]
            return res
        }, [])


        const res = Array.from(new Set(proxy_result))
        return res
    }, [FCams, FDepth, FQuery, FTags, cams, depths, items, query, tags])
    if (result.length === 0) return items
    else return result
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

export type Filters = | FilterByName<'query'> | FilterByTags<'tags'> | FilterByDepth<'depths'> | FilterByCams<'cams'>


export function useFilterParams() {
    const [filters, setFilters] = useState({ cams: [], depths: [], query: "", tags: [] })
    // const filterReducer = useCallback((filter_action: Filters) => {
    //     const reducer = (filt: FiltersParams) => {

    //         switch (filter_action.type) {
    //             case "name": {
    //                 // setFilters(prev => ({ ...prev, [filter_action.type]: filter_action.payload }))
    //                 return ({ ...filt, [filter_action.type]: filter_action.payload })

    //             }
    //             case "tags": {
    //                 // setFilters(prev => ({ ...prev, [filter_action.type]: filter_action.payload }))
    //                 return ({ ...filt, [filter_action.type]: filter_action.payload })
    //             }
    //             case "depths": {
    //                 // setFilters(prev => ({ ...prev, [filter_action.type]: filter_action.payload }))
    //                 return ({ ...filt, [filter_action.type]: filter_action.payload })
    //             }
    //             case "cams": {
    //                 // setFilters(prev => ({ ...prev, [filter_action.type]: filter_action.payload }))
    //                 return ({ ...filt, [filter_action.type]: filter_action.payload })
    //             }
    //         }
    //     }
    //     return reducer(filters)
    // }, [filters])

    return [filters, setFilters] as const

}