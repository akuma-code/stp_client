import { makeAutoObservable } from "mobx";
import { StpData, StpViewOptions } from "../../Components/StpTableView/StpDataTable";
import { StpTag } from "../../Components/StpTable/TableObjects";


export class TableViewStore {
    tableItems: StpData[]
    selectedItems: number[]
    viewOptions: StpViewOptions = {
        dense: false,
        order: 'asc',
        orderBy: 'depth',
        RPP: -1
    }
    filtering: {
        tags: StpTag[]
        cams: number[]
        depth: number[]
        query: string
    } = {
            tags: [],
            cams: [1, 2],
            depth: [],
            query: "",
        }
    constructor() {
        makeAutoObservable(this)
        this.tableItems = []
        this.selectedItems = []

    }

    setViewOptions(option: Partial<StpViewOptions>, log = { logThis: false }) {
        this.viewOptions = { ...this.viewOptions, ...option }
        if (log.logThis) console.log('options: ', this.viewOptions)
        return this
    }


}