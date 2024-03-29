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
    tags: StpTag[] = []
    depth: number[] = []
    // setCams: (cams: number[]) => void
    constructor() {
        this.cams = []
        this.tags = []
        this.depth = []
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

    // set depth(value: number[]) {
    //     this.depth = value
    // }
    // get cams() {
    //     return this.cams
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



