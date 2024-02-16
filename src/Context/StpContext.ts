import { StpData } from "../Components/DataTable/StpDataTable";
import { StpItem } from "../Components/StpTable/TableObjects";

export class StpContext {
    private stp_table: StpData[] = []
    constructor(table_preset?: StpItem[]) {
        this.stp_table = table_preset ? this.init(table_preset) : []
        console.log("table size: ", this.stp_table.length)
        console.count("rendered times: ")
    }

    get table() {
        return this.stp_table
    }

    init(preset: StpItem[]): StpData[] {
        return preset.map((p, i) => ({ ...p, id: i + 1 }))
    }
}