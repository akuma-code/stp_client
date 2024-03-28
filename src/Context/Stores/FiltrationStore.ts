import { action, makeAutoObservable, makeObservable, observable } from "mobx"
import { StpTag } from "../../Components/StpTable/TableObjects"
import { _isArr, _log } from "../../Helpers/helpersFns"
import { AnyObj, FiltersParams } from "../../Interfaces/Types"
import { StpData } from "../../Components/StpTableView/StpDataTable"


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
type FilterRecord = | FilterTags | FilterCams | FilterDepth
export class FilterStore implements FiltersParams {
    cams: number[]
    tags: StpTag[]
    depth: number[]
    setCams: (cams: number[]) => void
    constructor() {
        this.cams = []
        this.tags = []
        this.depth = []
        this.setCams = (value: number[]) => this.cams = value
        makeObservable(this, {
            setFilter: action,
            cams: observable,
            tags: observable,
            depth: observable,
            clearFilter: action,
            setCams: action,
            setDepth: action,
            setTags: action,
        },
            { name: 'FilterContext' })
    }

    public setFilter({ key, value }: FilterRecord) {
        switch (key) {
            case "cams": { this.cams = value; break }
            case "tags": { this.tags = value; break }
            case "depth": { this.depth = value; break }
        }

    }

    public clearFilter(key: FilterRecord['key']) {
        this.setFilter({ key, value: [] })
    }

    // setCams(value: number[]) {
    //     this.cams = value
    // }
    setDepth(value: number[]) {
        this.depth = value
    }
    setTags(value: StpTag[]) {
        this.tags = value
    }

}







export function comparator<T = AnyObj>(compareField: keyof T, value: T[typeof compareField]) {
    return (item: T) => {
        if (_isArr(value)) return value.includes(item[compareField])
        else return item[compareField] === value
    }
}



