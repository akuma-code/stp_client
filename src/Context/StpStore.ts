import { StpData } from "../Components/DataTable/StpDataTable";
import { StpItem } from "../Components/StpTable/TableObjects";
import { _isArr } from "../Helpers/helpersFns";

export class StpStore {
    private stp_table: readonly StpData[] = []
    public selected: number[] = []
    constructor(table_preset?: readonly StpItem[]) {
        this.stp_table = table_preset ? this.init(table_preset) : []
        console.log("table size: ", this.table.length)
        console.count("rendered times: ")
    }

    get table() {
        return [...this.stp_table]
    }
    get size() {
        return this.stp_table.length
    }
    private init(preset: readonly StpItem[]): StpData[] {
        return preset.map((p, i) => ({ ...p, id: i + 1 }))
    }

    // public select(idx: number | number[]) {
    //     this.selected = _isArr(idx) ? [...idx] : [idx]
    // }
}