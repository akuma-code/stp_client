import { StpData } from "../Components/DataTable/StpDataTable";
import { StpItem } from "../Components/StpTable/TableObjects";
import { _isArr } from "../Helpers/helpersFns";

export class StpStore {
    private stp_table: StpData[] = []
    public selected: number[] = []
    constructor(table_preset?: StpItem[]) {
        this.stp_table = table_preset ? this.init(table_preset) : []
        console.log("table size: ", this.table.length)
        console.count("rendered times: ")
    }

    get table() {
        return [...this.stp_table]
    }

    private init(preset: StpItem[]): StpData[] {
        return preset.map((p, i) => ({ ...p, id: i + 1 }))
    }

    // public select(idx: number | number[]) {
    //     this.selected = _isArr(idx) ? [...idx] : [idx]
    // }
}