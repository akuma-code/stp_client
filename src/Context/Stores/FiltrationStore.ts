import { action, makeAutoObservable, observable } from "mobx"
import { StpTag } from "../../Components/StpTable/TableObjects"
import { _isArr, _log } from "../../Helpers/helpersFns"
import { AnyObj, FiltersParams } from "../../Interfaces/Types"


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
export class FilterStore {
    cams: number[] = []
    tags: StpTag[] = ['energy', "hitproof"]
    depth: number[] = []
    // setCams: (cams: number[]) => void
    constructor() {
        // this.cams = []
        // this.tags = []
        // this.depth = []
        // this.setCams = (value: number[]) => this.cams = value
        makeAutoObservable(
            this,
            {},
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
    compareTag() {
        const tagreg = {
            simple: /simple/g,
            standart: /standart/g
        }

        const tagstr = this.tags.join("")
        _log("has simple", tagreg.simple.test(tagstr))
    }
    setCams(value: number) {
        this.cams = [...this.cams, value]
    }
    // set depth(value: number[]) {
    //     this.depth = value
    // }
    // set tags(value: StpTag[]) {
    //     this.tags = value
    // }
    // get cams() {
    //     return this.cams
    // }
    // get depth() {
    //     return this.depth
    // }
    // get tags() {
    //     return this.tags
    // }

}







export function comparator<T = AnyObj>(compareField: keyof T, value: T[typeof compareField]) {
    return (item: T) => {
        if (_isArr(value)) return value.includes(item[compareField])
        else return item[compareField] === value
    }
}



