import { makeAutoObservable } from "mobx"

export class SearchQueryStore {
    query: string = ""
    constructor() {
        this.query = ""
        makeAutoObservable(this)
    }
    setQuerySearch(str: string) {
        return this.query = str
    }

}
