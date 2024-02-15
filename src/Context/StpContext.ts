import { StpItem } from "../Components/StpTable/TableObjects";

export class StpContext {
    stp_table: StpItem[] = []
    constructor(table_preset?: StpItem[]) {
        this.stp_table = table_preset || []
        console.log("table size: ", this.stp_table.length)
        console.count("rendered times: ")
    }

    get table() {
        return this.stp_table
    }
}