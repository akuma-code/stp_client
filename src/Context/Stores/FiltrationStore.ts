import { action, makeAutoObservable, observable } from "mobx"
import { StpTag } from "../../Components/StpTable/TableObjects"
import { _isArr, _log } from "../../Helpers/helpersFns"
import { AnyObj, FiltersParams } from "../../Interfaces/Types"
import { StpData } from "../../Components/StpTableView/StpDataTable"

type PropFilter = { cams: number[], depth: number[], tags: StpTag[] }

type SelectorFilter = { cams?: number[] } | { depth?: number[] } | { tags?: StpTag[] }
type FilterCams = {
    key: 'cams'
    value: FiltersParams['cams']
}
type FilterDepth = {
    key: 'depth'
    value: FiltersParams['depth']
}
type FilterTags = {
    key: 'tags'
    value: FiltersParams['tags']
}
type FilterIds = {
    key: 'id'
    value: FiltersParams['id']
}
type FilterRecord = | FilterTags | FilterCams | FilterDepth | FilterIds
type FilterStoreOptions = {
    selectMax: number
}
export class FilterStore {
    cams: number[] = []
    tags: StpTag[] = []
    depth: number[] = []
    ids: number[] = []
    options: FilterStoreOptions
    // setCams: (cams: number[]) => void
    constructor(options?: FilterStoreOptions) {
        this.cams = []
        this.tags = []
        this.depth = []
        this.options = {
            selectMax: 5
        }
        if (options) this.initOptions(options)
        makeAutoObservable(
            this,
            {},
            { name: 'FilterContext' })
    }
    initOptions(options: FilterStoreOptions) {
        this.options = { ...this.options, ...options }
    }
    public setFilter({ key, value }: FilterRecord) {

        switch (key) {
            case "cams": { this.cams = value; break }
            case "tags": { this.tags = value; break }
            case "depth": { this.depth = value; break }
            case "id": { this.ids = value; break }
        }

    }

    public clearFilter(key?: FilterRecord['key']) {
        if (!key) {
            this.cams = []
            this.tags = []
            this.depth = []
            this.ids = []
            return
        }
        this.setFilter({ key, value: [] })
    }
    private compareTag() {
        const tagRegExp: Record<StpTag, RegExp> = {
            simple: /simple/g,
            standart: /standart/g,
            energy: /energy/g,
            hitproof: /hitproof/g,
            multi: /multi/g,
            solarproof: /solarproof/g,
            soundproof: /soundproof/g,
        }
    }
    setCams(value: number | number[]) {
        if (_isArr(value)) { this.cams = value }
        else this.cams = [...this.cams, value]
    }
    setDepth(value: number | number[]) {
        if (_isArr(value)) this.depth = value
        else this.depth = [...this.depth, value]
    }
    setTags(value: StpTag[] | StpTag) {
        this.tags = _isArr(value) ? value : [...this.tags, value]
    }
    applyFilters<T extends StpData>(items: T[]) {
        try {
            return filterPipe(items, this)

        } catch (error) {
            console.error(error, this)
            return items
        }
    }

    selectId(value: number | number[]) {
        if (_isArr(value)) this.ids = value
        else {


            if (!this.ids.includes(value) && this.ids.length <= this.options.selectMax) {

                this.ids = [...this.ids, value]

            }
            else this.ids = this.ids.filter(i => i !== value)

        }
    }


}


export function filterPipe<T extends StpData>(items: T[], prop_filters: PropFilter) {
    const _cams = checkNumericProp('cams', prop_filters.cams)
    const _depth = checkNumericProp('depth', prop_filters.depth)
    const _tags = checkTags(prop_filters.tags)
    return items
        .filter(_tags)
        .filter(_cams)
        .filter(_depth)
}

function checkTags(filter_tags: StpTag[]) {
    if (filter_tags.length === 0) return (item: StpData) => true
    return (item: StpData) => filter_tags.every(t => item.tags.includes(t))
}
function checkNumericProp<T = StpData>(filter_prop: keyof T, filter_arr: unknown[]) {
    if (filter_arr.length === 0) return (item: T) => true
    return (item: T) => filter_arr.includes(item[filter_prop])
}




export function comparator<T = AnyObj>(compareField: keyof T, value: T[typeof compareField]) {
    return (item: T) => {
        if (_isArr(value)) return value.includes(item[compareField])
        else return item[compareField] === value
    }
}



