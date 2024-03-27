import { _log } from "../../Helpers/helpersFns";
import { setupStpArray, updateTags } from "./StpTagsMaker";
import { StpItem } from "./TableObjects";
import { table_data_base } from "./Data/data_base";
import { table_data_BrGr } from "./Data/data_Fenix";
import { table_data_32mm } from "./Data/data_32mm";
import { apiRoute, proxyRoute } from "../../Routes/routePath";

import { GetInfiniteRowsInterface, dataExtractor } from "../../Hooks/useQueryFetch";
import { FetchedData, stpBackup_128 } from "./Data/data_spreadsheet";
import { StpData } from "../StpTableView/StpDataTable";
import { StpApiFetch } from "./StpFactory/StpApi";
import { AxiosRequestConfig } from "axios";

export async function GetStpDataPromise() {
    const stps = stpBackup_128.map(i => dataExtractor<FetchedData>(i))
    const stpdata: StpData[] = stps.map((item, idx) => ({ ...item, id: idx + 1 }))


    return stpdata
}
export async function GetPartialStpDataPromise({ itemsCount = 30 }) {
    let cursor = 0
    let nextCursor = itemsCount
    const stps = stpBackup_128.map(i => dataExtractor<FetchedData>(i))
    const stpdata: StpData[] = stps.map((item, idx) => ({ ...item, id: idx + 1 }))
    const s_data = (s: number, e: number) => {
        const sliced = stpdata.slice(s, e)
        cursor = e
        nextCursor = cursor + e
        const result = { data: sliced, prevCursor: e, nextCursor: s + e, count: Math.abs(s - e) }
        return result
    }
    return s_data(cursor, nextCursor)
    // const sliced = stpdata.slice(cursor, nextCursor)
    // return { data: sliced, nextCursor }
}

export async function LazyStpData() {
    const withTags32mm = table_data_32mm.map(updateTags)
    const withTagsBase = table_data_base.map(updateTags)
    const withTagsBrGr = table_data_BrGr.map(updateTags)

    const stp_data: StpItem[] = []
    const data = await stp_data.concat(
        withTagsBase,
        withTagsBrGr,
        withTags32mm)


    const stp_setup = setupStpArray(
        table_data_base,
        table_data_BrGr,
        table_data_32mm,
    )

    const last = stpBackup_128.map(i => dataExtractor<FetchedData>(i))
    return last
}


