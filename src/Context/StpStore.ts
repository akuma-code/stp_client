import { StpData } from "../Components/DataTable/StpDataTable";
import { StpItem } from "../Components/StpTable/TableObjects";

export class StpStore {
    private stp_table: readonly StpData[] = []
    public selected: number[] = []
    constructor(table_preset?: readonly StpItem[]) {
        this.stp_table = table_preset ? this.init(table_preset) : []

    }

    get table() {
        return [...this.stp_table]
    }
    get size() {
        return this.stp_table.length
    }
    init(preset: readonly StpItem[]): StpData[] {
        return preset.map((p, i) => ({ ...p, id: i + 1 }))
    }
    loadTable(table_preset: StpData[]) {
        this.stp_table = table_preset
    }
    // public select(idx: number | number[]) {
    //     this.selected = _isArr(idx) ? [...idx] : [idx]
    // }
}

export class StpService {

    store: StpData[]
    constructor(init_items?: StpData[]) {
        this.store = init_items ? init_items : []
    }
    filterProp(filter_type: 'include' | 'exclude', ...props: { [P in keyof StpData]?: StpData[P] }[]) {

        const order: Partial<StpData>[] = props

        function next<T extends StpData>(filtered_items: T[], { cams, depth, tags, name, id }: Partial<T>) {


        }

    }
}